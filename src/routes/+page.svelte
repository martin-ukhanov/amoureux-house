<script lang="ts">
	import '../app.css';
	import 'lenis/dist/lenis.css';
	import Lenis from 'lenis';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Story from '$lib/components/sections/Story.svelte';

	$effect(() => {
		// Initialize Lenis
		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});
</script>

<Header />

<main>
	<Hero />
	<Story />
</main>
