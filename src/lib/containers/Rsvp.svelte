<script lang="ts">
	import { schemaRsvp } from "$lib/schema";
	import { inview } from "svelte-inview";
	import { fade } from "svelte/transition";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "../../routes/$types";
	import Input from "$lib/components/Input.svelte";

	export let data: PageData;
	export let dueDate: string = "1 February 2024";
	let isShow: boolean = false;
	let isSuccess: boolean = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};

	const { form, errors, enhance, reset } = superForm(data.form, {
		validationMethod: "onblur",
		validators: schemaRsvp,
		onUpdated({ form }) {
			if (form.valid) {
				isSuccess = true;
			}
		},
	});
</script>

<div
	class="bg-white min-h-screen w-screen overflow-hidden relative"
	use:inview={{
		rootMargin: "0px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	{#if isShow && !isSuccess}
		<div
			class="h-full w-full container py-28 md:py-36 relative"
			in:fade={{ duration: 1000, delay: 500 }}
		>
			<div class="font-homemade-apple text-ca-blue text-5xl -rotate-6 mb-8 md:mb-14 lg:mb-24">
				Rsvp!
			</div>
			<div class="font-editor-hand text-ca-orange text-xl md:text-2xl">Due Date : {dueDate}</div>

			<form class="mt-12 flex flex-col gap-10" use:enhance method="POST" action="/">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6">
					<Input
						name="firstName"
						label="FIRST NAME"
						bind:value={$form.firstName}
						error={$errors.firstName}
					/>
					<Input
						name="lastName"
						label="LAST NAME"
						bind:value={$form.lastName}
						error={$errors.lastName}
					/>
					<Input
						name="phoneNumber"
						label="PHONE NUMBER"
						bind:value={$form.phoneNumber}
						error={$errors.phoneNumber}
					/>
					<Input name="email" label="EMAIL" bind:value={$form.email} error={$errors.email} />
				</div>
				<div>
					<div class="font-editor-hand text-ca-blue md:text-xl">
						Will you be attending the wedding?<span class="text-ca-error">*</span>
					</div>
					<div class="flex gap-12 md:gap-28 w-full ml-3 mt-3">
						<div class="flex gap-2 items-center">
							<input
								name="subject"
								type="radio"
								class="w-5 h-5 appearance-none border-2 border-ca-orange rounded-full box-content checked:bg-ca-orange checked:ring-4 checked:ring-white checked:ring-inset"
								bind:group={$form.isAttend}
								value={true}
							/>
							<div class="text-ca-blue font-editor-hand">YES</div>
						</div>
						<div class="flex gap-2 items-center">
							<input
								name="subject"
								type="radio"
								class="w-5 h-5 appearance-none border-2 border-ca-orange rounded-full box-content checked:bg-ca-orange checked:ring-4 checked:ring-white checked:ring-inset"
								bind:group={$form.isAttend}
								value={false}
							/>
							<div class="text-ca-blue font-editor-hand">NO</div>
						</div>
					</div>
				</div>

				<button
					type="submit"
					class="font-homemade-apple text-sm bg-ca-blue text-white rounded-full p-5"
				>
					Submit
				</button>
			</form>
		</div>
	{:else if isSuccess}
		<div class="h-full w-full container" in:fade={{ duration: 1000, delay: 0 }}>
			<div
				class="flex flex-col gap-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6"
			>
				<div class="font-homemade-apple text-5xl text-ca-blue -rotate-2 text-center">
					Thank You!
				</div>
				<div class="font-homemade-apple text-2xl text-ca-orange text-center">
					We’ll see you there!
				</div>
			</div>
		</div>
	{/if}
</div>
