import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import path from 'node:path';
import type { Plugin } from 'vite';

const alias = { $lib: path.resolve(import.meta.dirname, 'src/lib') };

/**
 * Stand in for `@sveltejs/enhanced-img` under test.
 *
 * The real plugin runs every source photo through sharp, which would cost minutes per test run
 * for output no test inspects. The stub keeps the `Picture` shape so anything reading `img.src`
 * or `sources` still works.
 */
const stubEnhancedImages = (): Plugin => ({
	name: 'stub-enhanced-images',
	enforce: 'pre',
	resolveId: (id) => (id.includes('&enhanced') ? `\0enhanced:${id}` : undefined),
	load(id) {
		if (!id.startsWith('\0enhanced:')) return undefined;
		const src = id.replace('\0enhanced:', '').split('?')[0];
		const picture = {
			img: { src, w: 1920, h: 1080 },
			sources: { webp: `${src} 1920w`, jpeg: `${src} 1920w` }
		};
		return `export default ${JSON.stringify(picture)};`;
	}
});

export default defineConfig({
	resolve: { alias },
	test: {
		projects: [
			{
				plugins: [stubEnhancedImages()],
				resolve: { alias },
				test: {
					name: 'server',
					environment: 'node',
					include: [
						'src/lib/content/**/*.test.ts',
						'src/lib/*.test.ts',
						'scripts/**/*.test.ts',
						'vite-plugins/**/*.test.ts'
					]
				}
			},
			{
				plugins: [stubEnhancedImages(), svelte({ hot: false }), svelteTesting()],
				resolve: { alias, conditions: ['browser'] },
				test: {
					name: 'client',
					environment: 'jsdom',
					include: ['src/lib/components/**/*.test.ts'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			}
		]
	}
});
