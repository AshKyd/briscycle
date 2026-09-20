import { readFile } from 'node:fs/promises';
import { glob } from 'node:fs/promises';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { parseFrontmatter } from './frontmatter.ts';
import { CONTENT_ROOT, normalisePermalink, urlFromContentFile } from './paths.ts';
import type { ContentFile } from '../../types.ts';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/** Split a markdown file into its YAML front matter block and its body. */
export function splitFrontmatter(source: string): { raw: string; body: string } {
	const match = source.match(FRONTMATTER);
	if (!match) return { raw: '', body: source };
	return { raw: match[1], body: source.slice(match[0].length) };
}

async function readContentFile(relativeFile: string): Promise<ContentFile> {
	const source = await readFile(path.join(CONTENT_ROOT, relativeFile), 'utf8');
	const { raw, body } = splitFrontmatter(source);
	const frontmatter = parseFrontmatter(parseYaml(raw) ?? {}, relativeFile);

	return {
		file: relativeFile,
		directory: path.dirname(relativeFile) === '.' ? '' : path.dirname(relativeFile),
		url: frontmatter.permalink
			? normalisePermalink(frontmatter.permalink)
			: urlFromContentFile(relativeFile),
		frontmatter,
		body
	};
}

let cache: Promise<ContentFile[]> | undefined;

async function readAll(): Promise<ContentFile[]> {
	const files: string[] = [];
	for await (const file of glob('**/*.md', { cwd: CONTENT_ROOT })) files.push(file);

	const pages = await Promise.all(files.sort().map(readContentFile));
	return pages;
}

/**
 * Every markdown file in the content tree, parsed. Memoised because both the page loader and
 * the site-data Vite plugin read the whole tree, and prerendering hits this once per page.
 */
export function loadContent(): Promise<ContentFile[]> {
	cache ??= readAll();
	return cache;
}

/** Drop the memoised content, so the dev server picks up edits to the markdown. */
export function clearContentCache(): void {
	cache = undefined;
}

/** Pages that are real, routable documents (excludes 404 and anything opted out). */
export async function loadPages(): Promise<ContentFile[]> {
	const pages = await loadContent();
	return pages.filter(({ file }) => file !== '404.md');
}

/** The 404 page, which is routed through `+error.svelte` rather than the catch-all. */
export async function loadNotFound(): Promise<ContentFile> {
	const pages = await loadContent();
	const notFound = pages.find(({ file }) => file === '404.md');
	if (!notFound) throw new Error('content/404.md is missing');
	return notFound;
}

/** Look up a page by its site URL. */
export async function findPageByUrl(url: string): Promise<ContentFile | undefined> {
	const pages = await loadPages();
	return pages.find((page) => page.url === url);
}
