<script lang="ts">
	import dayjs from "dayjs";
	import type { PageData } from "./$types";
	import { pb } from "$lib/pocketbase";
	import type { RecordModel } from "pocketbase";

	import Intro from "$lib/containers/Intro.svelte";
	import Invite from "$lib/containers/Invite.svelte";
	import SaveTheDate from "$lib/containers/SaveTheDate.svelte";

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
	<Invite
		brideLogo={pb.files.getUrl(data.response, data.response.bride_logo)}
		groomLogo={pb.files.getUrl(data.response, data.response.groom_logo)}
		fruitLogo={pb.files.getUrl(data.response, data.response.fruit_logo)}
		bellLogo={pb.files.getUrl(data.response, data.response.bell_logo)}
	/>
	<SaveTheDate
		weddingDay={dayjs(data.response.wedding_date)}
		saveTheDateImage={pb.files.getUrl(data.response, data.response.save_the_date_image)}
	/>
</div>
