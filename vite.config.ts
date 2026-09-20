import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { siteData } from './vite-plugins/site-data.ts';
import { contentAssets } from './vite-plugins/content-assets.ts';

export default defineConfig({
	plugins: [
		siteData(),
		contentAssets(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: '200.html',
				strict: true
			})
		})
	]
});
