/**
 * Typing for the pinned-width image imports this project uses.
 *
 * `@sveltejs/enhanced-img` ships an ambient declaration for a bare `*?enhanced` specifier only.
 * Every import here pins its widths, so the query ends in `&enhanced` instead — which a
 * TypeScript module wildcard can only match with the literal suffix last. `enhancedImages()`
 * looks for `enhanced` anywhere in the query, so the ordering costs nothing.
 *
 * This lives in its own file because a wildcard module declaration is only ambient in a file
 * with no top-level import or export; in `app.d.ts` it would be read as a module augmentation.
 */
declare module '*&enhanced' {
	const value: import('vite-imagetools').Picture;
	export default value;
}
