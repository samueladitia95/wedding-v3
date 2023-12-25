<script lang="ts">
	import clsx from "clsx";
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";

	export let flowerLogo: string;

	let isShow: boolean = false;
	let qna = [
		{
			question: "What should I wear to the holy matrimony?",
			answers: [
				"We kindly request that you dress in formal wear for our holy matrimony. Please refrain from wearing white, that’s reserved for the bride! Men are kindly requested to suit up and leave their batik, jeans, t-shirts, and slippers at home.",
				"If you have any questions about the dress code, please don’t hesitate to contact us.",
			],
			isOpen: false,
		},
		{
			question: "What should I wear to the dinner reception?",
			answers: [
				"We are excited to celebrate our wedding reception with you in style! For this occasion, we request that you dress in your best formal Indonesian attire.",
				"Ladies, this could include a formal Indonesian dress, but doesn’t necessarily have to be kebaya. We want you to be as stylish as you are comfortable! ",
				"Men, we request that you wear your best batik shirt.",
				"Please refrain from wearing white, jeans, t-shirts, shorts, or flip-flops.",
			],
			isOpen: false,
		},
		{
			question: "Can I bring a +1?",
			answers: [
				"Please note that this invitation is valid for one person, unless you have been informed otherwise personally.",
			],
			isOpen: false,
		},
		{
			question: "Will the wedding be indoors or outdoors?",
			answers: ["All events will be held indoors."],
			isOpen: false,
		},
		{
			question: "How’s the parking?",
			answers: ["Free valet service for everyone!"],
			isOpen: false,
		},
		{
			question: "Will the dinner reception be seated?",
			answers: [
				"Yes! Please RSVP to ensure that you will be attending the dinner reception, so that we can arrange the seating accordingly.",
			],
			isOpen: false,
		},
		{
			question: "Should I bring a gift?",
			answers: [
				"We are thrilled to have you celebrate with us, and while gifts are not necessary, we would be grateful if you choose to honor us with cash or angpao.",
			],
			isOpen: false,
		},
		{
			question: "I have more questions! Who should I speak to?",
			answers: [
				"You can reach out to Ausirio or Carmel directly. We look forward to celebrating with you!",
			],
			isOpen: false,
		},
	];

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};

	const handleOpenAccordion = (chosenIndex: number, value = false) => {
		qna = qna.map((qa, i) => {
			if (i === chosenIndex) {
				qa.isOpen = value;
			} else {
				qa.isOpen = false;
			}
			return qa;
		});
	};
</script>

<div
	class="bg-ca-red min-h-screen w-screen overflow-hidden relative"
	use:inview={{
		rootMargin: "100px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	<img src={flowerLogo} alt="Flower Logo" class="absolute -right-2 top-0 h-48 md:h-72 -rotate-12" />
	<div class="container relative py-16 text-white">
		{#if isShow}
			<div
				class="font-homemade-apple text-3xl/loose md:text-5xl/loose md:max-w-xs mb-10"
				in:fade={{ duration: 1000, delay: 200 }}
			>
				Questions & Answers
			</div>
		{/if}
		<div class="flex flex-col gap-12 items-center">
			{#each qna as qa, index}
				{#if isShow}
					<div
						class="font-editor-hand flex flex-col"
						transition:fly={{ x: -200, duration: 1000, delay: 200 * (index + 1) }}
					>
						<button
							class="flex justify-between items-center gap-2 w-full"
							on:click={() => {
								handleOpenAccordion(index, !qa.isOpen);
							}}
						>
							<div class="text-3xl text-left">Q: <span class="text-xl md:text-2xl">{qa.question}</span></div>
							<div class="text-4xl font-sans">
								{qa.isOpen ? "-" : "+"}
							</div>
						</button>

						<div
							class={clsx(
								"flex flex-col gap-8 overflow-hidden transform transition-all duration-200 ease-out",
								qa.isOpen ? "max-h-[1000px]" : "max-h-0",
							)}
						>
							<div class="text-3xl mt-2">
								A: <span class="text-base md:text-xl">{qa.answers.slice(0, 1)}</span>
							</div>
							{#if qa.answers.length > 1}
								{#each qa.answers.slice(1) as answer}
									<div class="md:text-xl">{answer}</div>
								{/each}
							{/if}
							<svg
								width="342"
								height="26"
								viewBox="0 0 342 26"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M340.064 2.67842C338.606 2.84046 337.702 4.20374 336.24 4.5908C331.719 5.78735 326.971 6.11286 322.327 6.55099C309.762 7.7364 296.594 7.45393 284.032 6.31193C258.559 3.99627 232.968 2.06661 207.345 1.81784C184.427 1.59533 151.074 -4.25358 137.161 18.9336C132.152 27.2826 147.701 25.5758 148.97 21.1328C154.794 0.749453 76.44 7.61769 67.7419 10.4235C55.2971 14.438 38.8275 19.6801 25.574 18.1208C17.7759 17.2034 7.8758 12.1403 1 8.70238"
									stroke="white"
									stroke-width="2"
									stroke-linecap="round"
								/>
							</svg>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
