<script lang="ts">
	import { gsap } from 'gsap';
	import { useGSAP } from '$lib/utils/gsap.svelte';
	import ButtonUnderline from '$lib/components/ButtonUnderline.svelte';
	import story1 from '$lib/assets/images/story-1.avif';
	import story2 from '$lib/assets/images/story-2.avif';
	import story3 from '$lib/assets/images/story-3.avif';
	import story4 from '$lib/assets/images/story-4.avif';

	let scrollArea: HTMLElement;

	$effect(() => {
		// Scroll animation
		useGSAP(() => {
			function init() {
				tl = gsap
					.timeline({
						scrollTrigger: {
							trigger: scrollArea,
							start: 'top 50%',
							end: 'bottom bottom',
							scrub: true
						}
					})
					.add([
						gsap.fromTo(
							'.image-1',
							{
								yPercent: -25,
								opacity: 0
							},
							{
								yPercent: 0,
								opacity: 1,
								ease: 'power1.in'
							}
						),
						gsap.fromTo(
							'.image-2',
							{
								xPercent: -25,
								opacity: 0
							},
							{
								xPercent: 0,
								opacity: 1,
								ease: 'power1.in'
							}
						),
						gsap.fromTo(
							'.image-3',
							{
								xPercent: 25,
								opacity: 0
							},
							{
								xPercent: 0,
								opacity: 1,
								ease: 'power1.in'
							}
						),
						gsap.fromTo(
							'.image-4',
							{
								yPercent: 25,
								opacity: 0
							},
							{
								yPercent: 0,
								opacity: 1,
								ease: 'power1.in'
							}
						)
					]);
			}

			function onResize() {
				tl.kill();
				init();
			}

			let tl: gsap.core.Timeline;

			gsap.set(['.image-1', '.image-2', '.image-3', '.image-4'], {
				xPercent: 0,
				yPercent: 0
			});

			init();

			window.addEventListener('resize', onResize);
			return () => window.removeEventListener('resize', onResize);
		}, scrollArea);
	});
</script>

<section bind:this={scrollArea}>
	<!-- Desktop -->
	<div class="hidden gap-x-16 py-12 pr-6 pl-16 desktop:flex">
		<div class="grid h-fit flex-3 grid-cols-6 gap-2.5">
			<h3 class="col-start-4">Pelagie's<br />Story</h3>

			<img
				src={story1}
				alt="Story 1"
				class="image-1 col-span-3 col-start-1 row-span-5 row-start-7 rounded-sm"
			/>
			<img
				src={story2}
				alt="Story 2"
				class="image-2 col-span-3 col-start-1 row-span-5 row-start-12 rounded-sm"
			/>
			<img
				src={story3}
				alt="Story 3"
				class="image-3 col-span-3 col-start-4 row-span-6 row-start-5 rounded-sm"
			/>
			<img
				src={story4}
				alt="Story 4"
				class="image-4 col-span-2 col-start-4 row-span-6 rounded-sm"
			/>
		</div>

		<div class="-mt-[0.5em] flex h-fit flex-4 flex-col gap-y-6">
			<div class="flex gap-x-2.5 text-secondary">
				<div class="flex-1 text-block">
					<p>
						AmoureuxHouse.org aims to make the cultural, historical, and architectural significance
						of the Amoureux House in Ste. Genevieve come alive for all, particularly youth and
						educators. The heart of AmoureuxHouse.org is the life of Pelagie Vital Amoureux, a
						remarkable woman who made this architectural gem her home. We hope discovering Pelagie's
						story will inspire others to find their own stories, experience the universal truths of
						home and community, and bring Ste. Genevieve's rich African-American history to the
						fore.
					</p>
					<p>
						Born into slavery in Ste. Genevieve, Missouri, in 1805, Pelagie raised her family in the
						Amoureux House, built in 1792. Today you can visit this rare example of French Creole
						architecture, located just 60 miles south of St. Louis.
					</p>
				</div>

				<div class="flex-1 text-block">
					<p>
						Our hope is that learning about Pelagie, her house, and the times in which she lived
						will pique your curiosity to wonder and ask questions. Did she cook a tasty gumbo? What
						did she and her family laugh and talk about? Where did she find her strength?
					</p>
					<p>
						We hope that asking such questions will cast a light on our shared humanity. Pelagie
						chose to live her life fully. She kept moving forward. She knew the true sense of
						courage.
					</p>
				</div>
			</div>

			<ButtonUnderline text="Download the app" href="/" />
		</div>
	</div>

	<!-- Tablet/Mobile -->
	<div class="flex flex-col gap-y-6 px-6 py-8 desktop:hidden">
		<h3 class="mt-6">Pelagie's<br />Story</h3>

		<div class="max-w-120 text-block text-secondary">
			<p>
				AmoureuxHouse.org aims to make the cultural, historical, and architectural significance of
				the Amoureux House in Ste. Genevieve come alive for all, particularly youth and educators.
				The heart of AmoureuxHouse.org is the life of Pelagie Vital Amoureux, a remarkable woman who
				made this architectural gem her home. We hope discovering Pelagie's story will inspire
				others to find their own stories, experience the universal truths of home and community, and
				bring Ste. Genevieve's rich African-American history to the fore.
			</p>
			<p>
				Born into slavery in Ste. Genevieve, Missouri, in 1805, Pelagie raised her family in the
				Amoureux House, built in 1792. Today you can visit this rare example of French Creole
				architecture, located just 60 miles south of St. Louis.
			</p>
			<p>
				Our hope is that learning about Pelagie, her house, and the times in which she lived will
				pique your curiosity to wonder and ask questions. Did she cook a tasty gumbo? What did she
				and her family laugh and talk about? Where did she find her strength?
			</p>
			<p>
				We hope that asking such questions will cast a light on our shared humanity. Pelagie chose
				to live her life fully. She kept moving forward. She knew the true sense of courage.
			</p>
		</div>

		<div class="my-4">
			<ButtonUnderline text="Download the app" href="/" />
		</div>

		<div class="grid grid-cols-8 gap-x-2.5 gap-y-10">
			<img src={story1} alt="Story 1" class="image-1 col-span-4 rounded-sm" />
			<img src={story2} alt="Story 2" class="image-2 col-span-5 row-start-2 rounded-sm" />
			<img src={story3} alt="Story 3" class="image-3 col-span-4 rounded-sm" />
			<img src={story4} alt="Story 4" class="image-4 col-span-3 row-start-2 rounded-sm" />
		</div>
	</div>
</section>
