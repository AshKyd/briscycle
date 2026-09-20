import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = path.resolve(import.meta.dirname, '../node_modules/bootstrap-icons/icons');
const OUTPUT_DIR = path.resolve(import.meta.dirname, '../static/images/icons');

/**
 * Bootstrap Icons used as card icons, by page.
 *
 * Vendored rather than referenced from `node_modules`, because a card icon is a plain URL in
 * front matter — the same way the hand-drawn icons beside the regulation pages work. Add an
 * entry here and re-run `npm run icons`.
 */
const ICONS: Record<string, string> = {
	'accessibility-statement': 'universal-access',
	'code-of-conduct': 'people',
	'privacy-policy': 'shield-lock',
	'terms-of-service': 'file-earmark-text',
	sustainability: 'tree'
};

/**
 * Bootstrap Icons are authored as `currentColor`, but these are loaded through `<img>`, where
 * no CSS applies and `currentColor` falls back to black. The existing card icons are white on
 * a coloured thumbnail, so they are recoloured to match.
 */
const toCardIcon = (svg: string): string => svg.replaceAll('currentColor', 'white');

await mkdir(OUTPUT_DIR, { recursive: true });

const written = await Promise.all(
	Object.entries(ICONS).map(async ([page, icon]) => {
		const source = await readFile(path.join(SOURCE_DIR, `${icon}.svg`), 'utf8').catch(() => {
			throw new Error(`Bootstrap Icons has no icon "${icon}" (used by ${page})`);
		});

		const destination = path.join(OUTPUT_DIR, `${icon}.svg`);
		await writeFile(destination, toCardIcon(source));
		return `${page} → /images/icons/${icon}.svg`;
	})
);

console.log(written.join('\n'));
console.log(`${written.length} icon(s) written to ${path.relative(process.cwd(), OUTPUT_DIR)}`);
