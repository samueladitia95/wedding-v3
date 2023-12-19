<script lang="ts">
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";

	export let groomLogo: string;
	export let brideLogo: string;
	export let fruitLogo: string;
	export let bellLogo: string;

	export let groomAndBrideName: string = "#AusirioCarmel";
	export let desc: string =
		"Love against reason, against promise, against peace, against hope, against happiness, against all discouragement that could be.";

	let isShow: boolean = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div
	class="bg-white h-screen overflow-hidden"
	use:inview={{
		rootMargin: "0px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	{#if isShow}
		<div class="h-full w-full relative z-10">
			<div
				class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 w-full max-w-xs md:max-w-lg"
				in:fade={{ duration: 1000, delay: 1500 }}
			>
				<div class="text-ca-blue text-2xl md:text-4xl text-center font-homemade-apple">
					{groomAndBrideName}
				</div>
				<img src={bellLogo} alt="Bell Logo" class="w-14 md:w-20" />
				<div class="text-ca-blue text-sm/loose md:text-2xl/loose text-center font-homemade-apple">
					{desc}
				</div>
			</div>

			<img
				src={groomLogo}
				alt="Groom Logo"
				class="absolute top-10 left-0 w-32 md:w-44 object-cover rotate-6"
				in:fly={{ duration: 1000, delay: 500, x: -100 }}
			/>
			<img
				src={fruitLogo}
				alt="Fruit Logo"
				class="absolute top-0 -right-8 md:right-0 w-28 md:w-48 object-cover"
				in:fly={{ duration: 1000, delay: 500, x: 100, y: -100 }}
			/>
			<img
				src={brideLogo}
				alt="Bride Logo"
				class="absolute bottom-0 right-0 w-32 md:w-44 object-cover -rotate-4"
				in:fly={{ duration: 1000, delay: 500, x: 100, y: 100 }}
			/>
			<div
				class="absolute bottom-8 left-8 text-sm/loose md:text-xl/loose text-ca-black font-homemade-apple cursor-pointer w-28 md:w-40"
				in:fly={{ duration: 1000, delay: 500, x: -100, y: 100 }}
			>
				Scroll down please!
			</div>
		</div>
	{/if}
</div>
