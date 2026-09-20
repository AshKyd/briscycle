import { buildSiteData } from '$lib/server/content/collections';
import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async () => {
	const siteData = await buildSiteData();
	return { siteData };
};
