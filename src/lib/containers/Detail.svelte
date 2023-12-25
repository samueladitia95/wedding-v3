<script lang="ts">
	import { inview } from "svelte-inview";
	import { fade } from "svelte/transition";

	export let scheduleImages: string[];
	export let galleryImages: string[];
	export let musicLogo: string;

	const schedules = [
		{
			icon: scheduleImages[0],
			event: "Ceremony",
			time: "12.00",
			isFamilyOnly: true,
			location: "GKI Kebayoran Baru",
			address: "Jl. Panglima Polim I No.51A, Jakarta Selatan",
		},
		{
			icon: scheduleImages[1],
			event: "Tea Pai Ceremony",
			time: "14.30",
			isFamilyOnly: true,
		},
		{
			icon: scheduleImages[2],
			event: "Dinner Receptions",
			time: "18.30",
			isFamilyOnly: false,
		},
		{
			icon: scheduleImages[3],
			event: "Drinks",
			time: "21.00",
			isFamilyOnly: false,
			location: "Gardenia Room, Hotel Grand Mahakam",
			address: "Jl. Mahakam No.6, Kramat Pela, Kec. Kby. Baru, Jakarta Selatan",
		},
	];
	let isShow: boolean = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div
	class="bg-white min-h-screen w-screen overflow-hidden"
	use:inview={{
		rootMargin: "0px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	{#if isShow}
		<div
			class="h-full w-full container py-28 font-homemade-apple relative"
			in:fade={{ duration: 0, delay: 0 }}
		>
			<div>
				<div class="text-center text-ca-blue text-3xl mb-10">The Details</div>

				<div class="flex flex-col items-center gap-14">
					{#each schedules as schedule}
						<div class="flex flex-col items-center gap-2">
							<img src={schedule.icon} alt="Icon" class="w-16 object-cover" />
							<div class="text-2xl text-ca-blue">{schedule.event}</div>
							<div class="text-xl text-ca-blue">{schedule.time}</div>
							{#if schedule.isFamilyOnly}
								<div class="text-sm text-ca-orange">*Family Only</div>
							{/if}
							{#if schedule.location && schedule.address}
								<div class="font-editor-hand text-2xl text-ca-red text-center max-w-xs">
									{schedule.location}
								</div>
								<div class="font-editor-hand text-base text-ca-red text-center max-w-xs">
									{schedule.address}
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<div class="flex flex-col gap-6 w-full my-40 relative">
					<div
						class="absolute -top-20 -left-2 -rotate-12 font-homemade-apple text-3xl/relaxed text-ca-blue"
					>
						Come join this joyous union with us!
					</div>
					<img src={galleryImages[0]} alt="gallery" class="h-[525px] object-cover" />
					<div class="grid grid-cols-2 gap-6 w-full">
						<img src={galleryImages[1]} alt="gallery" class="h-full object-cover" />
						<img src={galleryImages[2]} alt="gallery" class="h-full object-cover" />
					</div>
					<img src={galleryImages[3]} alt="gallery" class="h-[228px] object-cover" />
					<div class="absolute -bottom-20 -rotate-6 text-2xl/loose text-right text-ca-orange">
						Good food, great people, let’s celebrate!
					</div>
				</div>
			</div>
			<img src={musicLogo} alt="music logo" class="absolute bottom-20 left-4 h-20" />
		</div>
	{/if}
</div>
