import path from 'node:path';

/** Absolute path to the markdown content tree (the old Eleventy `site/` directory). */
export const CONTENT_ROOT = path.resolve(import.meta.dirname, '../../../../content');

/** Absolute path to the static directory, where generated image derivatives live. */
export const STATIC_ROOT = path.resolve(import.meta.dirname, '../../../../static');

/** Where `{% image %}` derivatives and front matter image derivatives are written. */
export const GENERATED_IMAGE_DIR = 'i';

/**
 * Turn a content file path into its site URL, mirroring Eleventy's directory-derived
 * permalinks: `foo/index.md` becomes `/foo/`, and `legal/privacy-policy.md` would become
 * `/legal/privacy-policy/` unless front matter overrides it.
 */
export function urlFromContentFile(relativeFile: string): string {
	const withoutExtension = relativeFile.replace(/\.md$/, '');
	const withoutIndex = withoutExtension.replace(/(^|\/)index$/, '');
	return withoutIndex ? `/${withoutIndex}/` : '/';
}

/**
 * Normalise a front matter `permalink` into the URL shape the router uses: always
 * leading-slash, and always trailing-slash unless it names a file (`/404.html`).
 */
export function normalisePermalink(permalink: string): string {
	const withLeadingSlash = permalink.startsWith('/') ? permalink : `/${permalink}`;
	const namesAFile = path.extname(withLeadingSlash) !== '';
	if (namesAFile || withLeadingSlash.endsWith('/')) return withLeadingSlash;
	return `${withLeadingSlash}/`;
}

/**
 * Resolve any of the several image path spellings used across the legacy site into a
 * single content-relative form (`brisbane-city/riverwalk/hero.jpg`).
 *
 * Three spellings exist and all must land in the same place, because the image manifest is
 * keyed by content-relative path:
 * - `{% image %}` bodies use build-root relative paths: `./site/brisbane-city/foo.jpg`
 * - front matter `hero.desktop` / `thumb.source` use site-root paths: `/brisbane-city/foo.jpg`
 * - a handful of front matter values are relative to the page: `gateway.geo.json`
 */
export function toContentPath(src: string, pageDirectory = ''): string {
	const stripped = src.replace(/^\.\/site\//, '').replace(/^\.\//, '');
	if (stripped.startsWith('/')) return stripped.slice(1);
	if (src.startsWith('./site/')) return stripped;
	return pageDirectory ? `${pageDirectory}/${stripped}` : stripped;
}

/** URL of a page-relative asset, e.g. a `geojsonUrl` of `gateway.geo.json`. */
export function resolveAgainstPage(src: string, pageUrl: string): string {
	if (src.startsWith('/') || src.startsWith('http')) return src;
	return new URL(src, `https://briscycle.com${pageUrl}`).pathname;
}
