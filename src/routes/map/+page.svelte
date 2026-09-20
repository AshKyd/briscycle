<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import Seo from '$lib/components/Seo/Seo.svelte';
	import { meta } from './meta.ts';
</script>

<Seo {meta} />

<!--
	The full-page map: no heading, container or footer, so the map fills the viewport. The page's
	one-sentence intro has never been rendered, and still is not.
-->
<Map centre={[153.02, -27.47]} zoom={12} height="90vh" bigMap />
