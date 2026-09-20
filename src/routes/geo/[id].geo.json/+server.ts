import { error, json } from '@sveltejs/kit';
import { extractGeojson } from '$lib/server/content/geojson';
import type { EntryGenerator, RequestHandler } from './$types.js';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const routes = await extractGeojson();
	return routes.map(({ id }) => ({ id }));
};

/**
 * Serve a page's route data as its own file.
 *
 * The GeoJSON for some pages runs to thousands of lines. Keeping it out of the page payload
 * means the map downloads it once, on demand, rather than it being inlined into the HTML and
 * duplicated again in the prerendered data.
 */
export const GET: RequestHandler = async ({ params }) => {
	const routes = await extractGeojson();
	const route = routes.find(({ id }) => id === params.id);
	if (!route) error(404, 'Not found');

	return json(route.data, { headers: { 'content-type': 'application/geo+json' } });
};
