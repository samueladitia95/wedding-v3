<script lang="ts">
	import { inview } from "svelte-inview";
	import { fade } from "svelte/transition";

	export let mainLogo: string;
	export let introGifDesktop: string;
	export let introGifTablet: string;
	export let introGifMobile: string;
	export let mainTag: string = "#AusirioCarmel";

	let isShow: boolean = false;
	let isShowCarausel: boolean = false;

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
	{#if isShow && !isShowCarausel}
		<div class="container h-full w-full relative">
			<div
				class="absolute top-1/3 md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 md:gap-6 text-ca-creme"
			>
				<img
					src={mainLogo}
					alt="Main Logo"
					class="w-12 md:w-20 h-20 md:h-32"
					in:fade={{ duration: 1500, delay: 500 }}
					out:fade={{ duration: 1000, delay: 0 }}
				/>
				<div
					class="font-homemade-apple text-center text-sm md:text-3xl"
					in:fade={{ duration: 1500, delay: 1000 }}
					out:fade={{ duration: 1000, delay: 0 }}
				>
					{mainTag}
				</div>
			</div>
			<button
				class="text-sm md:text-xl bg-white text-ca-brown font-homemade-apple whitespace-nowrap rounded-full px-6 py-3 md:px-8 md:py-4 absolute bottom-52 lg:bottom-28 left-1/2 transform -translate-x-1/2 hover:bg-slate-200"
				in:fade={{ duration: 1500, delay: 1500 }}
				out:fade={{ duration: 1000, delay: 0 }}
				on:click={() => {
					isShowCarausel = true;
					document.body.classList.remove("overflow-hidden");
				}}
			>
				Open Invitation
			</button>
		</div>
	{/if}

	{#if isShowCarausel}
		<div in:fade={{ duration: 1000, delay: 1000 }} class="w-screen h-screen z-20 bg-white">
			<img
				src={introGifMobile}
				alt="invite"
				class="object-cover h-screen w-screen object-center md:hidden"
				transition:fade={{ duration: 1000, delay: 0 }}
			/>
			<img
				src={introGifTablet}
				alt="invite"
				class="object-cover h-screen w-screen object-center hidden md:block lg:hidden"
				transition:fade={{ duration: 1000, delay: 0 }}
			/>
			<img
				src={introGifDesktop}
				alt="invite"
				class="object-cover h-screen w-screen object-center hidden lg:block"
				transition:fade={{ duration: 1000, delay: 0 }}
			/>
		</div>
	{/if}
</div>
