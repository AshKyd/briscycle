import thumb from './thumb-desktop.jpg?w=480;600;768;1080&format=webp;jpeg&enhanced';
import type { PageMeta } from '$lib/types';

export const meta: PageMeta = {
	url: '/gold-coast/',
	title: 'Gold Coast',
	description:
		"The Gold Coast is a great place to cycle as a commuter, and even better as a sightseer. The local council has placed an emphasis on bicycle infrastructure, so you'll find plenty of bike paths linking the coast and inland areas of the Gold Coast.",
	shortTitle: 'Gold Coast',
	tags: ['day-trips', 'menu', 'home'],
	related: 'day-trips',
	thumb,
	thumbAttribution: {
		name: 'Andrea Lai',
		title: 'Gold Coast, Brisbane, Australia',
		url: 'https://www.flickr.com/photos/atlai/9156923523/',
		license: 'https://creativecommons.org/licenses/by/2.0/'
	}
};
