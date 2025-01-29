import { gsap } from 'gsap';

export function useGSAP(func?: gsap.ContextFunc, scope?: Element | string | object) {
	const context = gsap.context(func, scope);
	$effect(() => () => context.revert());
	return context;
}
