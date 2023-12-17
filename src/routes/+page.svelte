<script lang="ts">
	import type { PageData } from "./$types";
	import Intro from "$lib/containers/Intro.svelte";
	import { pb } from "$lib/pocketbase";

	export let data: PageData;
</script>

<div>
	<Intro mainLogo={pb.files.getUrl(data.response, data.response.main_logo)} />
</div>
