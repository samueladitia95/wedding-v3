<script lang="ts">
	import type { Dayjs } from "dayjs";
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";

	export let groomNickname: string = "AUSIRIO";
	export let groomFullname: string = "Sangga Ndolu";
	export let groomImage: string;
	export let groomParent: string = "Frederik Ndolu & Sri Yuliatin";
	export let brideNickName: string = "CARMEL";
	export let brideFullname: string = "Gigi Moersalim";
	export let brideImage: string;
	export let brideParent: string = "Andy Moersalim & Jully Pangestu";
	export let weddingDay: Dayjs;
	export let ringLogo: string;

	let isShow: boolean = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div
	class="bg-ca-creme min-h-screen w-screen overflow-hidden py-20"
	use:inview={{
		rootMargin: "100px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	{#if isShow}
		<div class="container max-w-4xl flex flex-col items-center gap-12 md:gap-16 py-16 text-ca-blue">
			<div
				class="flex flex-col items-center gap-4 md:gap-6"
				in:fade={{ duration: 1000, delay: 500 }}
			>
				<img src={ringLogo} alt="Ring Logo" class="w-16 md:w-24" />
				<div class="font-homemade-apple text-xl md:text-2xl">The Wedding Of</div>
			</div>

			<div class="flex flex-col md:flex-row items-center md:justify-between gap-8 md:w-full">
				<div
					class="flex flex-col items-center gap-4"
					in:fly={{ duration: 1000, delay: 1000, x: -200 }}
				>
					<img
						src={groomImage}
						alt="Groom"
						class="w-40 md:w-48 h-60 md:h-80 object-cover rounded"
					/>
					<div class="font-goldenbook text-4xl md:text-5xl">{groomNickname}</div>
					<div class="font-homemade-apple text-xl md:text-2xl">{groomFullname}</div>
				</div>

				<div
					class="font-homemade-apple text-3xl md:text-7xl"
					in:fade={{ duration: 1000, delay: 1000 }}
				>
					&
				</div>

				<div
					class="flex flex-col items-center gap-4"
					in:fly={{ duration: 1000, delay: 1000, x: 200 }}
				>
					<img
						src={brideImage}
						alt="Bride"
						class="w-40 md:w-48 h-60 md:h-80 object-cover rounded object-[12%]"
					/>
					<div class="font-goldenbook text-4xl md:text-5xl">{brideNickName}</div>
					<div class="font-homemade-apple text-xl md:text-2xl">{brideFullname}</div>
				</div>
			</div>

			<div class="flex flex-col items-center gap-2" in:fade={{ duration: 1000, delay: 2000 }}>
				<div class="font-homemade-apple md:text-2xl">together with our parents</div>
				<div class="font-editor-hand text-xl md:text-2xl">{groomParent}</div>
				<div class="font-editor-hand text-xl md:text-2xl">{brideParent}</div>
			</div>

			<div
				class="font-editor-hand text-ca-orange text-3xl md:text-4xl"
				in:fade={{ duration: 1000, delay: 2000 }}
			>
				{weddingDay.format("DD MMMM YYYY")}
			</div>
		</div>
	{/if}
</div>
