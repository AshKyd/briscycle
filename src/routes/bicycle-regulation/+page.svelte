<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'Police on bikes outside the Gardens Point botanical gardens',
		attribution: {
			name: 'Tony Hisgett',
			title: 'Police Bikes 2',
			url: 'https://www.flickr.com/photos/hisgett/30738809600/',
			license: 'https://creativecommons.org/licenses/by/2.0/'
		}
	}}
>
	<p>
		Do you know the rules of the road? Check out this resource for tips and links to the information
		you need to know.
	</p>
	<p>
		Please note that this is not legal advice, and while I've listed sources for the information, it
		may not be correct or applicable in your case.
	</p>
	<p>
		If you have questions that aren't answered here, shoot an email to briscycle@kyd.com.au and I'll
		try to hunt down the answer for you.
	</p>
</ArticlePage>
