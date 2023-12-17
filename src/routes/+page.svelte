<script lang="ts">
	import type { PageData } from "./$types";
	import Intro from "$lib/containers/Intro.svelte";

	export let data: PageData;
	console.log(data);
</script>

<div>
	<Intro />
</div>
