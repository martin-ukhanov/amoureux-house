<script lang="ts">
	import { buttonInteraction } from '$lib/actions/buttonInteraction.svelte';

	const { text, href }: { text: string; href: string } = $props();
</script>

<a
	{href}
	class="relative flex items-center justify-center rounded-[50%] px-[2em] py-[1.25em] text-primary"
	use:buttonInteraction
>
	<svg
		viewBox="0 0 214 71"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="pointer-events-none absolute"
	>
		<path
			d="M164.776 10.481C130.948 -3.39441 65.9015 -1.04696 32.5127 11.0947C17.3066 16.6244 -10.733 32.647 6.32919 47.7743C9.33853 50.4425 12.9965 52.6101 16.7811 54.4858C58.4327 75.1273 116.526 73.0252 161.227 60.6742C167.894 58.8322 174.454 56.6455 180.49 53.6735C185.004 51.4506 189.368 48.6955 192.883 45.4803C203.174 36.0679 200.486 26.5955 189.414 18.6158C176.578 9.36391 159.024 6.49681 142.461 4.92661C127.978 3.55362 113.512 3.28997 98.9606 3.85033C71.6698 4.90109 40.2189 6.57306 17.3299 19.2221C7.33262 24.747 -3.40818 36.5527 5.1613 46.1079C14.4474 56.4619 36.3431 59.8145 51.0703 61.9994C90.7998 67.8938 153.663 64.971 189.851 49.5033C193.754 47.8353 197.707 46.2808 201.198 44.0874C203.956 42.3542 206.597 40.378 208.889 38.2392C225.125 23.0822 188.894 13.5522 176.117 11.9155C135.92 6.76702 76.427 -0.662833 39.4079 13.0332"
			stroke="currentColor"
			stroke-miterlimit="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<span class="text-center text-button text-nowrap">{text}</span>
</a>
