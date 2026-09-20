import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	define: {
		// Resolved when the site is generated, so the footer copyright never shows a stale year and
		// never depends on the reader's clock (which would also break hydration).
		__BUILD_YEAR__: new Date().getFullYear()
	},

	plugins: [
		// Must precede sveltekit(): its markup transform is `order: 'pre'`, so it always runs
		// before the Svelte compiler sees an `<enhanced:img>`.
		enhancedImages(),

		sveltekit({
			// Inline all page CSS (largest bundle is ~14 KB) so the critical render path
			// needs no blocking stylesheet request.
			inlineStyleThreshold: 16384,

			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				strict: true
			})
		})
	]
});
