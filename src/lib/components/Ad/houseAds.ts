/** A house ad shown in place of a blocked AdSense slot. */
export interface HouseAd {
	id: string;
	title: string;
	description: string;
	cta: string;
	link: string;
	/** Button colours, applied as inline custom properties. */
	style: string;
}

export const HOUSE_ADS: readonly HouseAd[] = [
	{
		id: 'youtube',
		title: 'Follow me on Youtube',
		description:
			'Hey, I also have a Youtube channel. Join me as I travel around Queensland, Australia, the world!',
		cta: 'Follow me?',
		link: 'https://ashk.au/yt',
		style: '--eleventyad-button-background:#c60000;--eleventyad-button-color:white'
	},
	{
		id: 'foodbank',
		title: 'One dollar donated is two meals created',
		description:
			'More than 2 million households ran out of food in the last year. Since you blocked ads, would you consider giving to Foodbank?',
		cta: 'Foodbank Queensland',
		link: 'https://www.foodbank.org.au/?state=qld',
		style: '--eleventyad-button-background:#671e75;--eleventyad-button-color:#fff'
	},
	{
		id: 'bcc-compost',
		title: 'BCC compost rebate program',
		description:
			'Did you know you can cut your greenhouse emissions and get a $70 rebate from Brisbane Council when you buy a compost system or worm farm?',
		cta: 'Rebate info',
		link: 'https://www.brisbane.qld.gov.au/clean-and-green/green-home-and-community/sustainable-gardening/compost-and-food-waste-recycling/compost-rebate-program',
		style: '--eleventyad-button-background:#006bb7;--eleventyad-button-color:white'
	},
	{
		id: 'aussiebb',
		title: 'Switch to Aussie Broadband and save $50',
		description:
			"Since you blocked ads, I thought I'd paste my Aussie Broadband referral code :P If you sign up for a broadband plan with code '3829918' you'll get $50 off.",
		cta: 'See plans',
		link: 'https://www.aussiebroadband.com.au/internet/nbn-plans/',
		style: '--eleventyad-button-background:#01711b;--eleventyad-button-color:rgb(253 250 170)'
	},
	{
		id: 'bnesocial',
		title: 'Join the Brisbane Mastodon',
		description:
			'Share your rides, get the latest news, and hang out with other peeps for free and without ads in the bne.social community #CyclingBrisbane',
		cta: 'Check it out',
		link: 'https://bne.social/',
		style: '--eleventyad-button-background:#6364ff;--eleventyad-button-color:white'
	}
];

const ROTATION_KEY = 'fallbackRotation';

/**
 * Pick the next house ad and advance the rotation.
 *
 * The index lives in session storage so that a reader who scrolls past several ad slots, or
 * moves between pages, sees a different one each time rather than the same ad repeated.
 */
export function nextHouseAd(
	read: (key: string, fallback: number) => number,
	write: (key: string, value: number) => void
): HouseAd {
	const index = Number(read(ROTATION_KEY, 0)) % HOUSE_ADS.length;
	write(ROTATION_KEY, (index + 1) % HOUSE_ADS.length);
	return HOUSE_ADS[index];
}
