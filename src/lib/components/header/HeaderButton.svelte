<script lang="ts">
	import { gsap } from 'gsap';
	import { SplitText } from 'gsap/dist/SplitText';
	import { useGSAP } from '$lib/utils/gsap.svelte';

	const { text }: { text: string } = $props();

	let context: gsap.Context;
	let text1: HTMLSpanElement;
	let text2: HTMLSpanElement;
	let underline: HTMLDivElement;

	$effect(() => {
		context = useGSAP((self) => {
			const st1 = new SplitText(text1, { type: 'chars,words' });
			const st2 = new SplitText(text2, { type: 'chars,words' });
			const tl = gsap.timeline({ paused: true }).add([
				gsap.to([st1.chars, st2.chars], {
					yPercent: -100,
					duration: 0.25,
					stagger: {
						amount: 0.25
					}
				}),
				gsap.to(underline, {
					width: '100%'
				})
			]);

			gsap.set([st1.chars, st2.chars], {
				yPercent: 0
			});

			self.add('mouseEnter', () => tl.play());
			self.add('mouseLeave', () => tl.reverse());
		});
	});
</script>

<div
	role="none"
	class="pointer-events-auto relative"
	onmouseenter={() => context.mouseEnter()}
	onmouseleave={() => context.mouseLeave()}
>
	<div class="relative flex items-center justify-center overflow-clip leading-[1.25]">
		<span class="sr-only">{text}</span>
		<span aria-hidden="true" bind:this={text1}>{text}</span>
		<span aria-hidden="true" class="absolute top-full text-primary" bind:this={text2}>{text}</span>
	</div>

	<div class="absolute -bottom-[0.25em] left-0 h-px bg-primary" bind:this={underline}></div>
</div>
