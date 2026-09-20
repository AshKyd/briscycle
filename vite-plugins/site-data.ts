import type { Plugin } from 'vite';
import { buildSiteData } from '../src/lib/server/content/collections.ts';

const MODULE_ID = 'virtual:briscycle/site';
const RESOLVED_ID = `\0${MODULE_ID}`;

/**
 * Expose the site-wide navigation and card data as a virtual module.
 *
 * Every page needs the header menu, the footer columns and the cards for its `related`
 * collection. Returning that from each page's load function would copy the same data into all
 * 47 prerendered payloads, so it is emitted once here and shared as a single chunk instead.
 */
export function siteData(): Plugin {
	return {
		name: 'briscycle:site-data',
		resolveId: (id) => (id === MODULE_ID ? RESOLVED_ID : undefined),
		async load(id) {
			if (id !== RESOLVED_ID) return undefined;
			const data = await buildSiteData();
			return `export default ${JSON.stringify(data)};`;
		}
	};
}
