/** Site-wide constants, ported from the legacy Eleventy `_data/site.js`. */
export const site = {
	title: 'Briscycle - Brisbane Cycling',
	origin: 'https://briscycle.com',
	description:
		'Briscycle is your number one destination for bike paths, maps, and cycling in Brisbane and surrounding areas.',
	author: { name: 'Ash Kyd', email: 'ash@kyd.com.au' },
	supportEmail: 'briscycle@kyd.com.au',
	/** Base for the "Edit this page on Github" footer link. A page's URL maps straight onto its route directory. */
	editBase: 'https://github.com/AshKyd/briscycle/tree/master/src/routes'
} as const;
