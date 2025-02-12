<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { SplitText } from 'gsap/dist/SplitText';
	import { useGSAP } from '$lib/utils/gsap.svelte';
	import { IsIntroComplete } from '$lib/utils/globals.svelte';
	import ButtonCircle from '$lib/components/ButtonCircle.svelte';
	import hero from '$lib/assets/images/hero.avif';

	let introContext: gsap.Context;
	let playContext: gsap.Context;

	let scrollArea: HTMLElement;

	let the: HTMLSpanElement;
	let amoureux: HTMLSpanElement;
	let house: HTMLSpanElement;

	let theWrapper: HTMLDivElement;
	let amoureuxWrapper: HTMLDivElement;
	let houseWrapper: HTMLDivElement;

	let play: HTMLDivElement;
	let playFill: HTMLDivElement;
	let playText: HTMLSpanElement;

	$effect(() => {
		// Intro animation
		introContext = useGSAP((self) => {
			const stThe = new SplitText(the, { type: 'chars,words' });
			const stAmoureux = new SplitText(amoureux, { type: 'chars,words' });
			const stHouse = new SplitText(house, { type: 'chars,words' });

			const tl = gsap.timeline({ delay: 0.5, paused: true }).add([
				gsap.to(stThe.chars, {
					yPercent: 0,
					duration: 1,
					stagger: {
						amount: 0.5
					},
					ease: 'expo.out'
				}),
				gsap.to(stAmoureux.chars.reverse(), {
					yPercent: 0,
					duration: 1,
					stagger: {
						amount: 0.5
					},
					ease: 'expo.out'
				}),
				gsap.to(stHouse.chars, {
					yPercent: 0,
					duration: 1,
					stagger: {
						amount: 0.5
					},
					ease: 'expo.out'
				})
			]);

			gsap.set([stThe.chars, stAmoureux.chars, stHouse.chars], {
				yPercent: 100
			});

			self.add('play', () => tl.play());
		});

		// Play interaction
		playContext = useGSAP((self) => {
			function calculateX(
				e: MouseEvent & {
					currentTarget: EventTarget & HTMLAnchorElement;
				}
			) {
				const { left, width } = e.currentTarget.getBoundingClientRect();

				return (
					e.clientX -
					left -
					(width - parseFloat(getComputedStyle(play).right.slice(0, -2))) +
					play.offsetWidth / 2
				);
			}

			function calculateY(
				e: MouseEvent & {
					currentTarget: EventTarget & HTMLAnchorElement;
				}
			) {
				const { top } = e.currentTarget.getBoundingClientRect();

				return (
					e.clientY -
					top -
					parseFloat(getComputedStyle(play).top.slice(0, -2)) -
					play.offsetHeight / 2
				);
			}

			function checkIsHovering(
				e: MouseEvent & {
					currentTarget: EventTarget & HTMLAnchorElement;
				}
			) {
				const { left, right, top, bottom } = play.getBoundingClientRect();

				if (e.clientX >= left && e.clientX <= right && e.clientY >= top && e.clientY <= bottom) {
					isHovering = true;
				} else {
					isHovering = false;
				}
			}

			const rotateTween = gsap.to(play, {
				rotate: '0deg',
				duration: 0.25,
				paused: true
			});

			const hoverTl = gsap.timeline({ paused: true }).add([
				gsap.to(play, {
					scale: 1.25,
					duration: 0.25
				}),
				gsap.to(playFill, {
					scale: 1,
					duration: 0.25
				}),
				gsap.to(playText, {
					color: getComputedStyle(document.documentElement).getPropertyValue('--color-surface'),
					duration: 0.25
				})
			]);

			let isHovering = $state(false);

			gsap.set(play, {
				x: 0,
				y: 0,
				scale: 1,
				rotate: '-16deg'
			});

			gsap.set(playFill, {
				scale: 0
			});

			self.add(
				'mouseEnter',
				(
					e: MouseEvent & {
						currentTarget: EventTarget & HTMLAnchorElement;
					}
				) => {
					gsap.to(play, {
						x: calculateX(e),
						y: calculateY(e),
						ease: 'power1.out',
						onUpdate: () => {
							checkIsHovering(e);
						}
					});

					rotateTween.play();
				}
			);

			self.add(
				'mouseMove',
				(
					e: MouseEvent & {
						currentTarget: EventTarget & HTMLAnchorElement;
					}
				) => {
					const xTo = gsap.quickTo(play, 'x', {
						ease: 'power1.out',
						onUpdate: () => {
							checkIsHovering(e);
						}
					});
					const yTo = gsap.quickTo(play, 'y', {
						ease: 'power1.out',
						onUpdate: () => {
							checkIsHovering(e);
						}
					});

					xTo(calculateX(e));
					yTo(calculateY(e));
				}
			);

			self.add(
				'mouseLeave',
				(
					e: MouseEvent & {
						currentTarget: EventTarget & HTMLAnchorElement;
					}
				) => {
					gsap.to(play, {
						x: 0,
						y: 0,
						ease: 'power1.out',
						onUpdate: () => {
							checkIsHovering(e);
						}
					});

					rotateTween.reverse();
				}
			);

			$effect(() => {
				if (isHovering) {
					hoverTl.play();
				} else {
					hoverTl.reverse();
				}
			});

			window.addEventListener('resize', self.mouseLeave);
			return () => window.removeEventListener('resize', self.mouseLeave);
		});

		// Scroll animation
		useGSAP(() => {
			function init() {
				mm = gsap.matchMedia();
				tl = gsap.timeline();

				mm.add('(width < 50rem)', () => {
					ScrollTrigger.create({
						animation: tl,
						trigger: scrollArea,
						start: 'top top',
						end: 'bottom top',
						scrub: true
					});

					tl.add([
						gsap.to(theWrapper, {
							x: '-50dvw',
							ease: 'power1.in'
						}),
						gsap.to(amoureuxWrapper, {
							x: '50dvw',
							ease: 'power1.in'
						}),
						gsap.to(houseWrapper, {
							x: '-50dvw',
							ease: 'power1.in'
						})
					]);
				});

				mm.add('(width >= 50rem)', () => {
					ScrollTrigger.create({
						animation: tl,
						trigger: scrollArea,
						start: 'top -25%',
						end: 'bottom top',
						scrub: true
					});

					tl.add([
						gsap.to(theWrapper, {
							x: '-25dvw',
							ease: 'power1.in'
						}),
						gsap.to(amoureuxWrapper, {
							x: '25dvw',
							ease: 'power1.in'
						}),
						gsap.to(houseWrapper, {
							y: '25dvh',
							ease: 'power1.in'
						})
					]);
				});
			}

			function onResize() {
				mm.kill();
				tl.kill();
				init();
			}

			let mm: gsap.MatchMedia;
			let tl: gsap.core.Timeline;

			gsap.set([theWrapper, amoureuxWrapper, houseWrapper], {
				x: 0,
				y: 0
			});

			init();

			window.addEventListener('resize', onResize);
			return () => window.removeEventListener('resize', onResize);
		});
	});

	$effect(() => {
		if (IsIntroComplete.get()) introContext.play();
	});
</script>

<section
	class="grid grid-cols-[auto_1fr] grid-rows-[repeat(6,auto)] gap-4 overflow-clip p-6 pb-0 max-tablet:pt-[calc(var(--header-height)+var(--spacing)*6)] tablet:grid-cols-[auto_auto_1fr] tablet:grid-rows-[1fr_auto_auto]"
	bind:this={scrollArea}
>
	<h1 class="sr-only">The Amoureux House</h1>

	<div
		class="self-end overflow-clip pt-[0.04em] text-h1 max-tablet:row-start-1"
		bind:this={theWrapper}
	>
		<span aria-hidden="true" class="-mb-[0.11em] block" bind:this={the}>The</span>
	</div>

	<a
		href="https://youtu.be/dQw4w9WgXcQ?si=wu4Hum0vthwGZ3m0"
		target="_blank"
		class="relative z-5 col-span-2 rounded-2xl max-tablet:row-start-4"
		onmouseenter={(e) => playContext.mouseEnter(e)}
		onmousemove={(e) => playContext.mouseMove(e)}
		onmouseleave={(e) => playContext.mouseLeave(e)}
	>
		<img
			src={hero}
			alt="Closeup shot of Pelagie sitting outside."
			class="rounded-[inherit] shadow-2xl shadow-[black]"
		/>

		<div
			class="pointer-events-none absolute -top-2 right-2 flex aspect-square items-center justify-center rounded-full bg-surface-content px-[1.25em] text-center leading-[1] text-secondary tablet:top-6 tablet:right-6 tablet:bg-transparent tablet:px-[1.5em] tablet:shadow-[inset_0_0_0_1px]"
			bind:this={play}
		>
			<div
				class="absolute hidden size-full scale-0 rounded-full bg-secondary tablet:block"
				bind:this={playFill}
			></div>

			<span class="relative hidden tablet:inline" bind:this={playText}>Play film</span>
			<span class="text-surface tablet:hidden">Play<br />Film</span>
		</div>
	</a>

	<div
		class="col-span-full overflow-clip pt-[0.04em] text-h1 max-tablet:row-start-2"
		bind:this={amoureuxWrapper}
	>
		<span aria-hidden="true" class="mr-[0.06em] -mb-[0.11em] block text-right" bind:this={amoureux}>
			Amoureux
		</span>
	</div>

	<div class="self-end text-body-sm max-tablet:row-start-5">
		<p>Featuring Pelagie X</p>
		<p>A film by Breakwater Studios</p>
	</div>

	<div class="overflow-clip pt-[0.04em] text-h1 max-tablet:row-start-3" bind:this={houseWrapper}>
		<span aria-hidden="true" class="-mb-[0.11em] block" bind:this={house}>House</span>
	</div>

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

		@media (width < 27.5rem) {
			@apply right-auto -left-1;
		}

		@media (width < 34rem) {
			@apply -bottom-1;
		}
	}
</style>
