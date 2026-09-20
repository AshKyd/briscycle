import type { Facet } from './types.ts';

export type { Facet };

/**
 * Tags that render an infobox badge. `tags` does double duty on this site — it is both
 * collection membership and a set of route attributes — so only the tags listed here produce
 * a badge, and everything else is purely a collection.
 */
export const FACETS: readonly Facet[] = [
	{
		tag: 'green-bridge',
		colour: '#81c784',
		iconUrl: '/images/noun-icons/noun-green-1733744.svg',
		title: 'Green bridge',
		iconName: 'Green icon',
		contributor: "Ker'is",
		body: "Brisbane's green bridges let you walk, ride and scoot around the city."
	},
	{
		tag: 'separated',
		colour: '#64b5f6',
		iconUrl: '/images/noun-icons/noun-path-1561502.svg',
		title: 'Separated path',
		iconName: 'Path',
		contributor: 'shashank singh',
		body: 'This route is separated from traffic for a more relaxed and safe ride.'
	},
	{
		tag: 'uphill',
		colour: '#f06292',
		iconUrl: '/images/noun-icons/noun-up-right-2032287.svg',
		title: 'Uphill',
		iconName: 'Up right',
		contributor: 'Markus',
		body: 'There might be a bit of uphill riding on this route.'
	},
	{
		tag: 'onroad',
		colour: '#7986cb',
		iconUrl: '/images/noun-icons/noun-road-776605.svg',
		title: 'On-road',
		iconName: 'Road icon',
		contributor: 'Gregor Cresnar',
		body: "You'll need to ride on the road for some of this route"
	},
	{
		tag: 'nature',
		colour: '#81c784',
		iconUrl: '/images/noun-icons/noun-nature-6069484.svg',
		title: 'Scenic route',
		iconName: 'Nature',
		contributor: 'I Putu Kharismayadi',
		body: 'This is a good route to enjoy nature.'
	}
];

/** The "under construction" badge, shown when front matter carries an `openDate`. */
export const OPEN_DATE_FACET = {
	colour: '#faf47f',
	iconUrl: '/images/noun-icons/noun-construction-1651220.svg',
	title: 'Under construction',
	iconName: 'Construction icon',
	contributor: 'Adrien Coquet'
} as const;

/** Badges for a page's tags, in the legacy infobox order. */
export const facetsFor = (tags: string[]): Facet[] =>
	FACETS.filter(({ tag }) => tags.includes(tag));
