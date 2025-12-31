<script lang="ts">
	import { gsapAnimate } from '../actions';
	import type { GSAPAnimateOptions, ElementType } from '../types';

	export let element: ElementType = 'div';
	export let type: 'to' | 'from' | 'fromTo' = 'from';

	// Allow any GSAP animation properties
	let className: string = '';
	export { className as class };

	// Capture all other props as animation options
	$$restProps;

	const browser = typeof window !== 'undefined';
	const animateProps: GSAPAnimateOptions = browser ? {
		type,
		...$$restProps
	} : { type, disabled: true };
</script>

<svelte:element this={element} use:gsapAnimate={animateProps} class={className}>
	<slot />
</svelte:element>
