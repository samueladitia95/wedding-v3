<script lang="ts">
	import { inview } from "svelte-inview";
	import { fade } from "svelte/transition";

	export let qrCodeImage: string;
	export let contentText: string =
		"We require only your presence, but if you feel so moved to give us a gift, we would be very grateful!";

	let isShow: boolean = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div
	class="bg-ca-creme h-screen overflow-hidden"
	use:inview={{
		rootMargin: "0px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	{#if isShow}
		<div class="h-full w-full relative" in:fade={{ duration: 1000, delay: 500 }}>
			<div
				class="flex flex-col gap-12 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 xl:w-1/2"
			>
				<div
					class="font-editor-hand text-ca-orange text-xl/relaxed md:text-2xl/relaxed xl:text-3xl/relaxed text-center"
				>
					{contentText}
				</div>
				<img src={qrCodeImage} alt="Qr Code" class="w-48 xl:w-72" />
			</div>
			<div
				class="bg-ca-orange text-sm xl:text-base font-editor-hand text-ca-creme absolute bottom-0 w-full text-center p-6"
			>
				Invitation by Another Chapter
			</div>
		</div>
	{/if}
</div>
