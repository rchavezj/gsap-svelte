<script lang="ts">
	import { gsapSlide } from '../actions';

	type ElementType = 'div' | 'span' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'aside' | 'nav';

	export let element: ElementType = 'div';
	export let direction: 'up' | 'down' | 'left' | 'right' = 'up';
	export let distance: number = 50;
	export let duration: number = 1;
	export let delay: number = 0;
	export let ease: string = 'power2.out';
	export let disabled: boolean = false;

	let className: string = '';
	export { className as class };

	const browser = typeof window !== 'undefined';
	const slideProps = browser ? { direction, distance, duration, delay, ease, disabled } : { direction, distance, duration, delay, ease, disabled: true };
</script>

<svelte:element this={element} use:gsapSlide={slideProps} class={className}>
	<slot />
</svelte:element>
