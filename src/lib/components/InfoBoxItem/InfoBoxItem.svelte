<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Fill colour of the circular icon backdrop. */
		colour: string;
		iconUrl: string;
		title: string;
		/** Name of the source icon, credited in the hover tooltip. */
		iconName: string;
		/** Noun Project contributor, credited in the hover tooltip. */
		contributor: string;
		children: Snippet;
	}

	let { colour, iconUrl, title, iconName, contributor, children }: Props = $props();
</script>

<div class="infobox__item">
	<div class="infobox__icon">
		<svg
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid slice"
			role="img"
			width="64"
			aria-hidden="true"
		>
			<circle fill={colour} cx="50" cy="50" r="50"></circle>
			<image href={iconUrl} width="80" x="10" y="10" />
		</svg>
		<p class="infobox__floater" aria-hidden="true">
			&ldquo;{iconName}&rdquo; icon by {contributor}, from thenounproject.com CC BY 3.0
		</p>
	</div>
	<div class="infobox__item-content">
		<strong class="infobox__heading">{title}</strong>
		<p class="infobox__body">{@render children()}</p>
	</div>
</div>
