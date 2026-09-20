<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { site } from '$lib/site';
	import { meta } from './meta.ts';
</script>

<ArticlePage {meta}>
	<p>Last Updated: <strong>13 March 2023</strong></p>
	We are committed to making our websites and mobile applications usable by all people, whatever their
	abilities or disabilities. To achieve this we strive to comply with the W3C’s [Web Content Accessibility
	Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/).
	<p>
		This site is created for flexible use on supporting devices. Find out more about software vendor
		accessibility with:
	</p>
	<ul>
		<li>
			<a href="http://www.microsoft.com/en-us/accessibility/">Microsoft Accessibility</a> Learn about
			built-in accessibility tools and features in Windows
		</li>
		<li>
			<a href="https://www.apple.com/au/accessibility/">Apple Accessibility</a> Find out how Apple supports
			inclusive use of Mac computers, and portable devices like iPhone&amp; iPad
		</li>
		<li>
			<a href="https://www.google.com.au/accessibility/">Google Accessibility</a> Read about Google's
			support for devices using the Android operating system, like smart phones and tablets
		</li>
	</ul>
	<h2>Limitations of this site's accessibility</h2>
	<p>While we've done a lot to ensure this site is accessibility, you may find some limitations:</p>
	<ul>
		<li>
			We aim to write simply and clearly. Some articles may be harder to read if they are about
			technical topics.
		</li>
		<li>
			Some of our articles contain audio and video from third parties. We aim to add captions, text
			transcripts and audio description to stories wherever possible.
		</li>
		<li>
			While the site has been created to be as accessible as possible, the website has not yet been
			user-tested with people who have disabilities.
		</li>
	</ul>
	<h2>Let us know if you have difficulties using this site</h2>
	<p>
		If you find anything on the site difficult to use please <a href="mailto:{site.supportEmail}"
			>contact us</a
		> with details of your experience.
	</p>
	<p>
		You can help get to the bottom of your difficulty faster by providing us with the information
		suggested in <a href="https://www.w3.org/WAI/users/inaccessible"
			>Contacting Organisations about Inaccessible Websites</a
		>.
	</p>
	<p>
		All constructive feedback regarding the accessibility or usability of this website is welcome
		and will be carefully considered.
	</p>
</ArticlePage>
