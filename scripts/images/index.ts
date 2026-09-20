import { mapLimit } from 'async';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { glob, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { parseArgs as parseCliArgs } from 'node:util';
import { collectSources } from './collectSources.ts';
import { mergeSpecs, type FormatSpec } from './roles.ts';
import type {
	Derivative,
	ImageManifest,
	ManifestEntry
} from '../../src/lib/server/content/images.ts';
import { CONTENT_ROOT, STATIC_ROOT } from '../../src/lib/server/content/paths.ts';

const execFileAsync = promisify(execFile);

/**
 * Concurrency limit for spawned vips subprocesses.
 * Using half of available CPU cores keeps the machine responsive and avoids thermal throttling.
 */
const PROCESS_CONCURRENCY = Math.max(1, Math.floor(availableParallelism() / 2));

const MANIFEST = path.resolve(import.meta.dirname, '../../src/lib/generated/images.json');
/** All generated files live here, and every one of them matches `*.min.*`. */
const OUTPUT_DIR = path.join(STATIC_ROOT, 'i');

const EXTENSIONS = { avif: 'avif', jpeg: 'jpg' } as const;

/** Read width and height of an image file via native vipsheader. */
async function getImageDimensions(filePath: string): Promise<{ width: number; height: number }> {
	const { stdout } = await execFileAsync('vipsheader', ['-f', 'width', '-f', 'height', filePath]);
	const [width = 0, height = 0] = stdout.trim().split(/\s+/).map(Number);
	return { width, height };
}

/** Identifies the render settings, so changing a role's widths invalidates the cache. */
const hashSpecs = (specs: FormatSpec[]): string =>
	createHash('sha256').update(JSON.stringify(specs)).digest('hex').slice(0, 12);

async function renderDerivative(
	source: string,
	contentPath: string,
	spec: FormatSpec,
	width: number
): Promise<Derivative> {
	const { dir, name } = path.parse(contentPath);
	const filename = `${name}-${width}.min.${EXTENSIONS[spec.format]}`;
	const outputPath = path.join(OUTPUT_DIR, dir, filename);

	const existingStat = await stat(outputPath).catch(() => null);
	if (existingStat && existingStat.size > 0) {
		const { width: outputWidth, height: outputHeight } = await getImageDimensions(outputPath);
		return {
			url: `/i/${dir ? `${dir}/` : ''}${filename}`,
			width: outputWidth,
			height: outputHeight,
			format: spec.format
		};
	}

	await mkdir(path.dirname(outputPath), { recursive: true });

	const formatOptions =
		spec.format === 'avif'
			? `[Q=${spec.quality},compression=av1,effort=9,subsample_mode=on]`
			: `[Q=${spec.quality},optimize_coding=true,interlace=true]`;

	await execFileAsync('vips', [
		'--vips-concurrency=2',
		'thumbnail',
		source,
		`${outputPath}${formatOptions}`,
		String(width),
		'--size',
		'down'
	]);

	const { width: outputWidth, height: outputHeight } = await getImageDimensions(outputPath);

	return {
		url: `/i/${dir ? `${dir}/` : ''}${filename}`,
		width: outputWidth,
		height: outputHeight,
		format: spec.format
	};
}

/** Render every derivative for one source image. */
async function renderSource(contentPath: string, specs: FormatSpec[]): Promise<ManifestEntry> {
	const source = path.join(CONTENT_ROOT, contentPath);
	const { size, mtimeMs } = await stat(source);
	const { width, height } = await getImageDimensions(source);

	// Never upscale: a 900px photo has no business emitting a 3840px derivative.
	const jobs = specs.flatMap((spec) =>
		spec.widths
			.filter((requested, index) => requested <= width || index === spec.widths.length - 1)
			.map((requested) => ({ spec, width: Math.min(requested, width) }))
	);

	const derivatives = await mapLimit(jobs, PROCESS_CONCURRENCY, async ({ spec, width: target }) =>
		renderDerivative(source, contentPath, spec, target)
	);

	return {
		mtimeMs,
		size,
		optionsHash: hashSpecs(specs),
		intrinsic: { width, height },
		derivatives: dedupe(derivatives)
	};
}

/** Clamping widths down to the intrinsic size can produce duplicates; keep one of each. */
const dedupe = (derivatives: Derivative[]): Derivative[] => [
	...new Map(derivatives.map((d) => [`${d.format}-${d.width}`, d])).values()
];

const isFresh = async (contentPath: string, entry: ManifestEntry | undefined, hash: string) => {
	if (!entry || entry.optionsHash !== hash) return false;
	const { size, mtimeMs } = await stat(path.join(CONTENT_ROOT, contentPath));
	return entry.size === size && entry.mtimeMs === mtimeMs;
};

async function readManifest(): Promise<ImageManifest> {
	const file = await import('node:fs/promises').then(({ readFile }) =>
		readFile(MANIFEST, 'utf8').catch(() => '{}')
	);
	return JSON.parse(file) as ImageManifest;
}

async function main() {
	const { values } = parseCliArgs({
		options: {
			force: { type: 'boolean', default: false },
			clean: { type: 'boolean', default: false },
			check: { type: 'boolean', default: false },
			only: { type: 'string' }
		}
	});

	if (values.clean) {
		await rm(OUTPUT_DIR, { recursive: true, force: true });
		console.log(`Removed ${path.relative(process.cwd(), OUTPUT_DIR)}`);
	}

	const sources = await collectSources();
	const existing = values.force || values.clean ? {} : await readManifest();

	const wanted = [...sources]
		.filter(([contentPath]) => !values.only || contentPath.includes(values.only))
		.map(([contentPath, roles]) => ({ contentPath, specs: mergeSpecs([...roles]) }));

	if (values.check) return check(wanted, existing);

	const currentManifest: ImageManifest = { ...existing };

	const saveManifest = async () => {
		const sorted = Object.fromEntries(Object.entries(currentManifest).sort(([a], [b]) => a.localeCompare(b)));
		await writeFile(MANIFEST, `${JSON.stringify(sorted, null, '\t')}\n`);
	};

	await mapLimit(
		wanted,
		2,
		async ({ contentPath, specs }: { contentPath: string; specs: FormatSpec[] }) => {
			const hash = hashSpecs(specs);
			if (await isFresh(contentPath, existing[contentPath], hash)) {
				return;
			}
			console.log(`rendering ${contentPath}`);
			const entry = await renderSource(contentPath, specs);
			currentManifest[contentPath] = entry;
			await saveManifest();
		}
	);

	const manifest = currentManifest;

	const count = Object.values(manifest).reduce((n, { derivatives }) => n + derivatives.length, 0);
	console.log(`${Object.keys(manifest).length} sources, ${count} derivatives.`);
	await warnAboutOrphans(manifest);
}

/** Fail loudly in CI when the committed derivatives no longer match the content. */
async function check(
	wanted: { contentPath: string; specs: FormatSpec[] }[],
	existing: ImageManifest
) {
	const stale = await Promise.all(
		wanted.map(async ({ contentPath, specs }) =>
			(await isFresh(contentPath, existing[contentPath], hashSpecs(specs))) ? null : contentPath
		)
	);

	const problems = stale.filter((entry): entry is string => entry !== null);
	if (problems.length === 0) return console.log('Image derivatives are up to date.');

	console.error(`Stale or missing derivatives for:\n${problems.map((p) => `  ${p}`).join('\n')}`);
	console.error('Run `npm run images`.');
	process.exitCode = 1;
}

/** Report generated files no longer referenced by any page, so they can be pruned. */
async function warnAboutOrphans(manifest: ImageManifest) {
	const known = new Set(
		Object.values(manifest).flatMap(({ derivatives }) => derivatives.map(({ url }) => url))
	);

	const orphans: string[] = [];
	for await (const file of glob('**/*.min.*', { cwd: OUTPUT_DIR })) {
		if (!known.has(`/i/${file}`)) orphans.push(file);
	}

	if (orphans.length > 0) {
		console.warn(`${orphans.length} orphaned derivative(s); run with --clean to prune.`);
	}
}

await main();
