import { stat } from 'node:fs/promises';
import path from 'node:path';
import { loadContent } from './loadContent.ts';
import { CONTENT_ROOT, toContentPath } from './paths.ts';
import type { ContentFile } from '../../types.ts';

/** Attributes in hand-written HTML that can point at an asset beside the markdown. */
const ASSET_ATTRIBUTES = /(?:src|srcset|poster|data)=["']([^"']+)["']/g;
/** Markdown image and link syntax, e.g. `![alt](photo.webp)`. */
const MARKDOWN_LINKS = /!\[[^\]]*\]\(([^)\s]+)\)/g;

/**
 * Split a `srcset` into its candidate URLs, dropping the width and density descriptors.
 */
const srcsetUrls = (value: string): string[] =>
	value
		.split(',')
		.map((candidate) => candidate.trim().split(/\s+/)[0])
		.filter(Boolean);

/** Strip a query string or fragment, and decode percent-escapes. */
function cleanUrl(value: string): string | undefined {
	const [withoutHash] = value.split('#');
	const [withoutQuery] = withoutHash.split('?');
	if (!withoutQuery || withoutQuery.startsWith('http') || withoutQuery.startsWith('data:')) {
		return undefined;
	}
	try {
		return decodeURIComponent(withoutQuery);
	} catch {
		return withoutQuery;
	}
}

/** Both halves of a legacy paired asset, e.g. `hero-desktop.webp` and `hero-mobile.webp`. */
const pairedAssets = (base: string, format: string): string[] => [
	`${base}-desktop.${format}`,
	`${base}-mobile.${format}`
];

/** Every asset one page points at, as written (before resolving against the content root). */
function referencesOf({ frontmatter, body }: ContentFile): string[] {
	const { hero, thumb, icon, geo } = frontmatter;

	const heroAssets =
		hero?.type === 'defaultImage'
			? pairedAssets(hero.image, hero.format)
			: hero?.type === 'variations'
				? hero.sources.flatMap(({ srcset }) => srcsetUrls(srcset))
				: [];

	const thumbAssets = thumb?.type === 'paired' ? pairedAssets(thumb.image, thumb.format) : [];

	const inBody = [...body.matchAll(ASSET_ATTRIBUTES)].flatMap(([, value]) => srcsetUrls(value));
	const inMarkdown = [...body.matchAll(MARKDOWN_LINKS)].map(([, value]) => value);

	return [...heroAssets, ...thumbAssets, ...inBody, ...inMarkdown, icon, geo?.geojsonUrl].filter(
		(value): value is string => typeof value === 'string'
	);
}

let cache: Promise<Set<string>> | undefined;

async function collect(): Promise<Set<string>> {
	const pages = await loadContent();

	const candidates = pages.flatMap((page) =>
		referencesOf(page)
			.map(cleanUrl)
			.filter((value): value is string => value !== undefined)
			.map((value) => toContentPath(value, page.directory))
	);

	// Many references point into `static/` or at generated derivatives under `/i/`; only the
	// ones that resolve to a real file in the content tree need publishing from here.
	const found = await Promise.all(
		[...new Set(candidates)].map(async (relative) => {
			const exists = await stat(path.join(CONTENT_ROOT, relative)).then(
				(entry) => entry.isFile(),
				() => false
			);
			return exists ? relative : undefined;
		})
	);

	return new Set(found.filter((value): value is string => value !== undefined));
}

/**
 * Every asset in the content tree that a page actually references.
 *
 * The content tree doubles as a working directory — it holds camera originals, editing
 * scratch files and superseded crops alongside the assets the site serves. Publishing the
 * whole tree shipped hundreds of megabytes of files nothing links to, so only referenced
 * assets are copied.
 */
export function referencedAssets(): Promise<Set<string>> {
	cache ??= collect();
	return cache;
}

/** Drop the memoised set, so the dev server picks up edits to the content. */
export function clearAssetCache(): void {
	cache = undefined;
}
