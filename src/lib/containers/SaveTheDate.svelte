<script lang="ts">
	import type { Dayjs } from "dayjs";
	import dayjs from "dayjs";
	import duration from "dayjs/plugin/duration";
	import { onMount } from "svelte";
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";

	dayjs.extend(duration);

	export let groomAndBrideName: string = "#AusirioCarmel";
	export let weddingDay: Dayjs;
	export let saveTheDateImage: string;

	let isShow: boolean = false;
	let countdowns = [
		{ type: "Month", value: 0 },
		{ type: "Day", value: 0 },
		{ type: "Minute", value: 0 },
		{ type: "Second", value: 0 },
	];

	onMount(() => {
		setInterval(function () {
			const currentTime = dayjs();
			const duration = dayjs.duration(weddingDay.diff(currentTime));

			countdowns = [
				{ type: "Month", value: duration.months() },
				{ type: "Day", value: Math.floor(duration.days()) },
				{ type: "Minute", value: duration.minutes() },
				{ type: "Second", value: duration.seconds() },
			];
		}, 1000);
	});

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div
	class="bg-ca-red h-screen overflow-hidden"
	use:inview={{
		rootMargin: "0px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
	id="save-the-date"
>
	{#if isShow}
		<div class="h-full w-full relative z-10">
			<div
				class="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 w-full md:mt-10 xl:max-w-xl"
				in:fade={{ duration: 1000, delay: 500 }}
			>
				<div
					class="text-ca-creme font-homemade-apple text-3xl/loose md:text-5xl/loose -rotate-12 absolute left-8 -top-28 md:-top-32"
				>
					<div>Save the date!</div>
					<div>{weddingDay.format("DD MMM YYYY")}</div>
				</div>
				<img
					src={saveTheDateImage}
					alt="Save Them Date"
					class="h-64 md:h-[586px] lg:h-[502px] w-full object-cover rounded"
				/>
				<div
					class="text-ca-creme font-editor-hand text-2xl/loose md:text-4xl/loose absolute bottom-28 -right-2 md:right-4 -rotate-12"
				>
					{groomAndBrideName}
				</div>
				<div
					class="text-ca-creme font-editor-hand flex justify-between gap-5 pt-10 md:pt-12 md:w-full md:px-10 lg:px-0"
				>
					{#each countdowns as countdown}
						<div class="flex flex-col justify-center items-center">
							<div class=" text-3xl md:text-5xl">{countdown.value}</div>
							<div class="text-sm md:text-2xl">{countdown.type}(S)</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
