<script lang="ts">
	import { gsap } from 'gsap';
	import { useGSAP } from '$lib/utils/gsap.svelte';
	import ButtonCircle from '$lib/components/ButtonCircle.svelte';
	import loopingVideo from '$lib/assets/images/looping-video.avif';

	let scrollArea: HTMLElement;
	let image: HTMLImageElement;
	let the: HTMLSpanElement;
	let amoureux: HTMLSpanElement;
	let house: HTMLSpanElement;

	$effect(() => {
		useGSAP(() => {
			const mm = gsap.matchMedia();

			gsap.set([the, amoureux, house, image], {
				x: 0,
				y: 0
			});

			mm.add('(width < 50rem)', () => {
				gsap
					.timeline({
						scrollTrigger: {
							trigger: scrollArea,
							start: 'top top',
							end: 'bottom top',
							scrub: true
						}
					})
					.add([
						gsap.to(the, {
							x: '-50dvw',
							ease: 'power1.in'
						}),
						gsap.to(amoureux, {
							x: '50dvw',
							ease: 'power1.in'
						}),
						gsap.to(house, {
							x: '-50dvw',
							ease: 'power1.in'
						}),
						gsap.to(image, {
							x: '50dvw',
							ease: 'power1.in'
						})
					]);
			});

			mm.add('(width >= 50rem)', () => {
				gsap
					.timeline({
						scrollTrigger: {
							trigger: scrollArea,
							start: 'top -15%',
							end: 'bottom top',
							scrub: true
						}
					})
					.add([
						gsap.to(the, {
							x: '-25dvw',
							ease: 'power1.in'
						}),
						gsap.to(amoureux, {
							x: '25dvw',
							ease: 'power1.in'
						}),
						gsap.to(house, {
							y: '25dvh',
							ease: 'power1.in'
						}),
						gsap.to(image, {
							y: '-25dvh',
							ease: 'power1.in'
						})
					]);
			});
		});
	});
</script>

<section
	class="grid grid-cols-[auto_1fr] grid-rows-[repeat(6,auto)] gap-4 overflow-clip p-6 pb-0 max-tablet:pt-[calc(var(--header-height)+var(--spacing)*6)] tablet:grid-cols-[auto_auto_1fr] tablet:grid-rows-[1fr_auto_auto]"
	bind:this={scrollArea}
>
	<h1 class="sr-only">The Amoureux House</h1>

	<span
		aria-hidden="true"
		class="-mb-[0.146em] block self-end text-h1 max-tablet:row-start-1"
		bind:this={the}
	>
		The
	</span>
	<img
		src={loopingVideo}
		alt="Looping Video"
		class="col-span-2 rounded-2xl shadow-lg shadow-[black]/50 max-tablet:row-start-4"
		bind:this={image}
	/>

	<span
		aria-hidden="true"
		class="col-span-full mt-[0.02333em] mr-[0.05em] -mb-[0.146em] block text-right text-h1 max-tablet:row-start-2"
		bind:this={amoureux}
	>
		Amoureux
	</span>

	<div class="self-end text-body-sm max-tablet:row-start-5">
		<p>Featuring Pelagie X</p>
		<p>A film by Breakwater Studios</p>
	</div>
	<span
		aria-hidden="true"
		class="mt-[0.02333em] -mb-[0.146em] block text-h1 max-tablet:row-start-3"
		bind:this={house}
	>
		House
	</span>
	<div class="relative max-tablet:row-start-3">
		<div class="button-position absolute">
			<ButtonCircle text="Visit The House" href="/" />
		</div>
	</div>

	<div class="relative col-span-full h-px bg-primary"></div>
</section>

<style>
	@reference '../../../app.css';

	.button-position {
		@apply right-0 bottom-0;

		@media (width < 28rem) {
			@apply right-auto left-0;
		}

		@media (width < 44rem) {
			@apply top-0 bottom-auto;
		}
	}
</style>
