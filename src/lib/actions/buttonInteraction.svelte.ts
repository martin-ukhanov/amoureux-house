import { gsap } from 'gsap';
import { useGSAP } from '$lib/utils/gsap.svelte';
import type { Action } from 'svelte/action';

export const buttonInteraction: Action = (node) => {
	$effect(() => {
		const moveContext = useGSAP((self) => {
			gsap.set(node, {
				x: 0,
				y: 0
			});

			self.add('mouseMove', (e: MouseEvent) => {
				const xTo = gsap.quickTo(node, 'x', { duration: 0.25, ease: 'power1.out' });
				const yTo = gsap.quickTo(node, 'y', { duration: 0.25, ease: 'power1.out' });

				const { left, top, width, height } = node.getBoundingClientRect();
				const x = e.clientX - (left + width / 2);
				const y = e.clientY - (top + height / 2);
				const intensity = 0.15;

				xTo(x * intensity);
				yTo(y * intensity);
			});

			self.add('mouseLeave', () => {
				self.kill();

				gsap.to(node, {
					x: 0,
					y: 0,
					duration: 0.25,
					ease: 'power1.out'
				});
			});
		});

		const scaleContext = useGSAP((self) => {
			const tween = gsap.to(node, {
				scale: 1.1,
				duration: 0.25,
				paused: true
			});

			gsap.set(node, {
				scale: 1
			});

			self.add('mouseEnter', () => tween.play());
			self.add('mouseLeave', () => tween.reverse());
		});

		node.addEventListener('mousemove', moveContext.mouseMove);
		node.addEventListener('mouseleave', moveContext.mouseLeave);

		node.addEventListener('mouseenter', scaleContext.mouseEnter);
		node.addEventListener('mouseleave', scaleContext.mouseLeave);

		return () => {
			node.removeEventListener('mousemove', moveContext.mouseMove);
			node.removeEventListener('mouseleave', moveContext.mouseLeave);

			node.removeEventListener('mouseenter', scaleContext.mouseEnter);
			node.removeEventListener('mouseleave', scaleContext.mouseLeave);
		};
	});
};
