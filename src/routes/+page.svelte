<script lang="ts">
	import type { PageData } from "./$types";
	import Intro from "$lib/containers/Intro.svelte";
	import { pb } from "$lib/pocketbase";
	import type { RecordModel } from "pocketbase";

	export let data: PageData;

	const parseCarausel = (data: RecordModel): string[] => {
		const result: string[] = data.intro_images.map((item: string) => pb.files.getUrl(data, item));
		return result;
	};
</script>

<div>
	<Intro
		mainLogo={pb.files.getUrl(data.response, data.response.main_logo)}
		carauselImages={parseCarausel(data.response)}
	/>
</div>
