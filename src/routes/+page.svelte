<script lang="ts">
	import { onMount } from "svelte";
	import dayjs from "dayjs";
	import type { PageData } from "./$types";
	import { pb } from "$lib/pocketbase";
	import type { RecordModel } from "pocketbase";

	import Intro from "$lib/containers/Intro.svelte";
	import Invite from "$lib/containers/Invite.svelte";
	import SaveTheDate from "$lib/containers/SaveTheDate.svelte";
	import TheWeddingOf from "$lib/containers/TheWeddingOf.svelte";
	import QnA from "$lib/containers/QnA.svelte";
	import QrCode from "$lib/containers/QrCode.svelte";
	import Detail from "$lib/containers/Detail.svelte";
	import Rsvp from "$lib/containers/Rsvp.svelte";
	import Wishes from "$lib/containers/Wishes.svelte";

	export let data: PageData;

	let scheduleImages = data.response.schedules_images
		? data.response.schedules_images.map((el: string) => {
				return pb.files.getUrl(data.response, el);
			})
		: [];

	let galleryImages = data.response.gallery_images
		? data.response.gallery_images.map((el: string) => {
				return pb.files.getUrl(data.response, el);
			})
		: [];

	onMount(() => {
		document.body.classList.add("no-scrollbar");
		document.body.scrollIntoView(true);
		document.body.classList.add("overflow-hidden");
	});
</script>

<svelte:head>
	<meta name="theme-color" content="#C25414" />
</svelte:head>

<div>
	<Intro
		mainLogo={pb.files.getUrl(data.response, data.response.main_logo)}
		introGifMobile={pb.files.getUrl(data.response, data.response.intro_gif_image_mobile)}
		introGifTablet={pb.files.getUrl(data.response, data.response.intro_gif_image_tablet)}
		introGifDesktop={pb.files.getUrl(data.response, data.response.intro_gif_image_desktop)}
	/>
	<Invite
		ribbonLogo={pb.files.getUrl(data.response, data.response.ribbon_logo)}
		cakeLogo={pb.files.getUrl(data.response, data.response.cake_logo)}
		fruitLogo={pb.files.getUrl(data.response, data.response.fruit_logo)}
		bellLogo={pb.files.getUrl(data.response, data.response.bell_logo)}
	/>
	<SaveTheDate
		weddingDay={dayjs(data.response.wedding_date)}
		saveTheDateImage={pb.files.getUrl(data.response, data.response.save_the_date_image)}
	/>
	<TheWeddingOf
		weddingDay={dayjs(data.response.wedding_date)}
		groomImage={pb.files.getUrl(data.response, data.response.groom_image)}
		brideImage={pb.files.getUrl(data.response, data.response.bride_image)}
		ringLogo={pb.files.getUrl(data.response, data.response.ring_logo)}
	/>
	<Detail
		{scheduleImages}
		{galleryImages}
		musicLogo={pb.files.getUrl(data.response, data.response.music_logo)}
	/>
	<QnA flowerLogo={pb.files.getUrl(data.response, data.response.flower_logo)} />
	<Rsvp {data} />
	<Wishes {data} />
	<QrCode qrCodeImage={pb.files.getUrl(data.response, data.response.qr_code_image)} />
</div>
