<script lang="ts">
	import Input from "$lib/components/InputWhite.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import dayjs from "dayjs";
	import { pb } from "$lib/pocketbase";
	import { _schemaWishes } from "$lib/schema";
	import { goto, invalidateAll } from "$app/navigation";
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";
	import { superForm, superValidateSync } from "sveltekit-superforms/client";
	import type { PageData } from "../../routes/$types";
	import { page } from "$app/stores";

	export let data: PageData;

	let isShow: boolean = false;
	let n: string = $page.url.searchParams.get("n") || ""; // query search

	// it means when the data change, it will reactive to the ui
	$: wishes = data.wishes?.items;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};

	const { form, errors, enhance } = superForm(superValidateSync(_schemaWishes), {
		SPA: true,
		validators: _schemaWishes,
		resetForm: true,
		async onUpdate({ form }) {
			if (form.valid) {
				try {
					const data = {
						...form.data,
						project: "default",
						template_id: "wedding_v2",
					};

					await pb.collection("wishes").create(data);

					invalidateAll();
				} catch (err) {
					console.log("wishes submit error: ", err);
				}
			}
		},
	});

	// ? Methods
	const handleLoadMore = async () => {
		let newPage = 2;
		if (n && +n) {
			newPage++;
		}
		n = String(newPage);
		const query = {
			n: String(newPage),
		};

		await goto(`?${new URLSearchParams(query).toString()}`, {
			keepFocus: true,
			noScroll: true,
		});
	};
</script>

<div>
	<div
		class="relative min-h-screen"
		use:inview={{
			rootMargin: "0px",
			unobserveOnEnter: true,
		}}
		on:inview_change={handleChange}
	>
		{#if isShow}
			<div class="z-20 min-h-screen bg-ca-orange">
				<!-- Main Section -->
				<div class="container pt-40 max-w-3xl">
					<div
						class="text-left text-ca-creme font-homemade-apple text-4xl/loose md:text-6xl -rotate-1"
						in:fade={{ duration: 1000, delay: 1000 }}
					>
						Wishes for us!
					</div>

					<!-- FORM -->
					<form
						in:fade={{ duration: 1000, delay: 1000 }}
						class="mt-4 flex flex-col gap-8"
						method="post"
						use:enhance
					>
						<Input
							name="name"
							label="Fill Your Name"
							bind:value={$form.name}
							error={$errors.name}
						/>
						<TextArea
							name="comment"
							label="Write your wishes"
							bind:value={$form.wishes}
							error={$errors.wishes}
						/>
						<button
							type="submit"
							class="ftext-sm md:text-xl bg-white text-ca-brown font-homemade-apple rounded-full hover:bg-opacity-80 disabled:bg-opacity-50 py-2"
						>
							Send
						</button>
					</form>

					<!-- Commnets -->
					<div class="py-20" in:fly={{ x: -1000, duration: 2000, delay: 2500 }}>
						<div class="flex flex-col gap-12 md:gap-14 justify-start items-start">
							{#each wishes as wish}
								<div class="flex flex-col justify-start items-start gap-4">
									<div class="font-homemade-apple text-ca-creme md:text-2xl">{wish.name}</div>
									<div class="font-editor-hand text-ca-creme text-sm md:text-xl">{wish.wishes}</div>
									<div class="font-editor-hand text-ca-creme text-xs md:text-sm">
										{dayjs(wish.created).format("dddd, D MMMM YYYY H:mm")}
									</div>
								</div>
							{/each}
						</div>
						<button
							class="mt-8 font-editor-hand text-lg md:text-xl w-full rounded-full hover:bg-opacity-80 disabled:bg-opacity-50 py-3 text-ca-creme border border-ca-creme"
							on:click={() => handleLoadMore()}
						>
							More
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
