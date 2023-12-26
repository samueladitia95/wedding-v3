<script lang="ts">
	import { fly } from "svelte/transition";

	export let name: string;
	export let label: string;
	export let error: string[] | undefined = undefined;
	export let value: string;
</script>

<div class="relative h-11 w-full font-editor-hand">
	<input
		placeholder={label}
		class="peer h-full w-full border-b border-white bg-transparent pt-4 pb-1.5 text-white outline outline-0 transition-all placeholder-shown:border-white focus:text-white focus:outline-0 placeholder:opacity-0 focus:placeholder:opacity-100 md:text-xl"
		bind:value
		required
		{name}
	/>
	<div
		class="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-sm leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-white after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-sm peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white"
	>
		{label} <span class="text-ca-error">*</span>
	</div>

	{#if error && error.length}
		<div transition:fly={{ y: -20, duration: 300 }} class="text-xs text-ca-error pt-2">
			{error[0]}
		</div>
	{/if}
</div>
