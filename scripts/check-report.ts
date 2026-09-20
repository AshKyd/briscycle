import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUTPUT = path.resolve(import.meta.dirname, '../.reports/check.json');

/** One diagnostic line from svelte-check's machine-verbose output. */
interface Diagnostic {
	type: string;
	filename?: string;
	start?: { line: number; character: number };
	message?: string;
	code?: number | string;
}

/**
 * Run svelte-check and write its findings as a single JSON document.
 *
 * `--output machine-verbose` emits newline-delimited JSON, which is awkward to consume; this
 * collects it into one file with a summary so the result can be read in one go.
 */
const run = (): Promise<{ lines: string[]; exitCode: number }> =>
	new Promise((resolve, reject) => {
		const child = spawn(
			'npx',
			['svelte-check', '--tsconfig', './tsconfig.json', '--output', 'machine-verbose'],
			{ cwd: path.resolve(import.meta.dirname, '..') }
		);

		const lines: string[] = [];
		child.stdout.on('data', (chunk: Buffer) => lines.push(...chunk.toString().split('\n')));
		child.stderr.on('data', (chunk: Buffer) => process.stderr.write(chunk));
		child.on('error', reject);
		child.on('close', (exitCode) => resolve({ lines, exitCode: exitCode ?? 0 }));
	});

/** Each line is `<timestamp> <JSON>`; anything else is progress noise. */
const parseLine = (line: string): Diagnostic | undefined => {
	const json = line.slice(line.indexOf(' ') + 1).trim();
	if (!json.startsWith('{')) return undefined;
	try {
		return JSON.parse(json) as Diagnostic;
	} catch {
		return undefined;
	}
};

const { lines, exitCode } = await run();
const records = lines.map(parseLine).filter((record): record is Diagnostic => record !== undefined);

const diagnostics = records.filter(({ type }) => type === 'ERROR' || type === 'WARNING');
const count = (type: string) => diagnostics.filter((d) => d.type === type).length;

await mkdir(path.dirname(OUTPUT), { recursive: true });
await writeFile(
	OUTPUT,
	`${JSON.stringify(
		{
			ranAt: new Date().toISOString(),
			exitCode,
			summary: { errors: count('ERROR'), warnings: count('WARNING') },
			diagnostics
		},
		null,
		'\t'
	)}\n`
);

console.log(
	`svelte-check: ${count('ERROR')} error(s), ${count('WARNING')} warning(s) → ${path.relative(process.cwd(), OUTPUT)}`
);
process.exitCode = exitCode;
