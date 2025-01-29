import { gsap } from 'gsap';
import { useGSAP } from '$lib/utils/gsap.svelte';
import type { Action } from 'svelte/action';

export const buttonGrow: Action = (node) => {
	$effect(() => {
		const context = useGSAP((self) => {
			const tween = gsap.to(node, {
				scale: 1.1,
				duration: 0.25,
				paused: true
			});

			gsap.set(node, {
				scale: 1
			});

			self.add('play', () => tween.play());
			self.add('reverse', () => tween.reverse());
		});

		node.addEventListener('mouseenter', context.play);
		node.addEventListener('mouseleave', context.reverse);
		node.addEventListener('mousedown', context.reverse);
		node.addEventListener('mouseup', context.play);

		return () => {
			node.removeEventListener('mouseenter', context.play);
			node.removeEventListener('mouseleave', context.reverse);
			node.removeEventListener('mousedown', context.reverse);
			node.removeEventListener('mouseup', context.play);
		};
	});
};
