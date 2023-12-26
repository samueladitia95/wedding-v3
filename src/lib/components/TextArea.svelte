<script lang="ts">
	import { fly } from "svelte/transition";

	export let name: string;
	export let label: string;
	export let error: string[] | undefined = undefined;
	export let value: string;
</script>

<div class="relative w-full font-editor-hand">
	<textarea
		{name}
		bind:value
		class="peer h-full min-h-[200px] md:text-xl text-white w-full resize-none rounded-[7px] border bg-transparent px-3 py-3 md:py-5 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-ro-white focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 {value
			? 'border-t-transparent'
			: ''}"
		placeholder=" "
		autocomplete="off"
	/>
	<div
		class="text-sm md:text-base pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-base peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-sm md:peer-focus:text-base peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-ro-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-ro-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white text-white border-ro-white {error
			? 'text-ro-error  peer-focus:text-ro-error'
			: 'text-white'}"
	>
		{label}
	</div>

	{#if error && error.length}
		<div transition:fly={{ y: -20, duration: 300 }} class="text-xs text-ro-error pt-2">
			{error[0]}
		</div>
	{/if}
</div>
