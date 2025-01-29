<script lang="ts">
	import '../app.css';
	import 'lenis/dist/lenis.css';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import Lenis from 'lenis';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Story from '$lib/components/sections/Story.svelte';

	gsap.registerPlugin(ScrollTrigger);

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

<main class="overflow-clip">
	<Hero />
	<Story />
</main>
