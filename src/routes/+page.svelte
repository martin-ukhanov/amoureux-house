<script lang="ts">
	import '../app.css';
	import 'lenis/dist/lenis.css';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import Lenis from 'lenis';
	import { useGSAP } from '$lib/utils/gsap.svelte';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Story from '$lib/components/sections/Story.svelte';
	import hero from '$lib/assets/images/hero.avif';
	import story1 from '$lib/assets/images/story-1.avif';
	import story2 from '$lib/assets/images/story-2.avif';
	import story3 from '$lib/assets/images/story-3.avif';
	import story4 from '$lib/assets/images/story-4.avif';

	let images = [hero, story1, story2, story3, story4];
	let imageIndex = $state(0);

	let overlay: HTMLDivElement;
	let image: HTMLDivElement;

	// Initialize GSAP
	gsap.defaults({
		duration: 0.5,
		ease: 'power1.inOut'
	});
	gsap.registerPlugin(ScrollTrigger);

	$effect(() => {
		// Initialize Lenis
		const lenis = new Lenis();

		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);

		// Reset and disable scroll
		lenis.scrollTo(0, { immediate: true });
		lenis.stop();

		// Intro animation
		useGSAP(() => {
			const interval = setInterval(() => {
				imageIndex = (imageIndex + 1) % images.length;
			}, 200);

			gsap.set(image, {
				scale: 0
			});

			gsap.to(image, {
				scale: 1
			});

			gsap.to(overlay, {
				opacity: 0,
				delay: 2,
				onStart: () => {
					clearInterval(interval);
				},
				onComplete: () => {
					overlay.style.pointerEvents = 'none';
					lenis.start();
				}
			});

			return () => clearInterval(interval);
		});
	});
</script>

<div class="fixed inset-0 z-20 flex items-center justify-center bg-surface" bind:this={overlay}>
	<div class="scale-0" bind:this={image}>
		<div
			style={`background-image: url(${images[imageIndex]});`}
			class="flex aspect-video w-64 items-center justify-center rounded-sm bg-cover bg-center"
		>
			<span class="text-center font-heading">The Amoureux House</span>
		</div>
	</div>
</div>

<Header />

<main class="overflow-clip">
	<Hero />
	<Story />
</main>
