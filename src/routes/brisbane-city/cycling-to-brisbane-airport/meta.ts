import thumb from './brisbane-airport-desktop.jpg?w=480;600;768;1080&format=webp;jpeg&enhanced';
import type { PageMeta } from '$lib/types';

export const meta: PageMeta = {
	url: '/brisbane-city/cycling-to-brisbane-airport/',
	title: 'Cycling to Brisbane Airport',
	description:
		"If you want to ride to Brisbane Airport you'll need to be confident with on-road cycling. The official route is different depending on whether you're inbound or outbound.",
	shortTitle: 'Getting to the Airport',
	tags: ['brisbane', 'onroad'],
	related: 'brisbane',
	thumb,
	thumbAttribution: {
		name: 'NellCR',
		title: 'Brisbane Airport',
		url: 'https://www.flickr.com/photos/nellcr/7687587582/',
		license: 'https://creativecommons.org/licenses/by-sa/2.0/'
	},
	icbm: '-27.413,153.09'
};
