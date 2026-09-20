import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import path from 'node:path';

const alias = { $lib: path.resolve(import.meta.dirname, 'src/lib') };

export default defineConfig({
	resolve: { alias },
	test: {
		projects: [
			{
				resolve: { alias },
				test: {
					name: 'server',
					environment: 'node',
					include: [
						'src/lib/server/**/*.test.ts',
						'src/lib/*.test.ts',
						'scripts/**/*.test.ts',
						'vite-plugins/**/*.test.ts'
					]
				}
			},
			{
				plugins: [svelte({ hot: false }), svelteTesting()],
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
