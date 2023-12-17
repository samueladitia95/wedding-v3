<script lang="ts">
	import { inview } from "svelte-inview";
	import { fade } from "svelte/transition";

	export let mainLogo: string;
	export let mainTag: string = "#AusirioCarmel";

	let isShow: boolean = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div
	class="bg-ca-orange h-screen w-screen"
	use:inview={{
		rootMargin: "0px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	{#if isShow}
		<div class="container h-full w-full relative">
			<div
				class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 md:gap-6 text-ca-creme"
			>
				<img
					src={mainLogo}
					alt="Main Logo"
					class="w-12 md:w-20 h-20 md:h-32"
					in:fade={{ duration: 1500, delay: 500 }}
				/>
				<div
					class="font-homemade-apple text-center text-sm md:text-3xl"
					in:fade={{ duration: 1500, delay: 1000 }}
				>
					{mainTag}
				</div>
			</div>
			<button
				class="text-sm md:text-xl bg-white text-ca-brown font-homemade-apple whitespace-nowrap rounded-full px-6 py-3 md:px-8 md:py-4 absolute bottom-36 md:bottom-48 lg:bottom-28 left-1/2 transform -translate-x-1/2 hover:bg-slate-200"
				in:fade={{ duration: 1500, delay: 1500 }}
			>
				Open Invitation
			</button>
		</div>
	{/if}
</div>
