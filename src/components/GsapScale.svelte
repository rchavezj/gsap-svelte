<script lang="ts">
	import { gsapScale } from '../actions';

	type ElementType = 'div' | 'span' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'aside' | 'nav';

	export let element: ElementType = 'div';
	export let from: number = 0;
	export let to: number = 1;
	export let duration: number = 1;
	export let delay: number = 0;
	export let ease: string = 'power2.out';
	export let disabled: boolean = false;

	let className: string = '';
	export { className as class };

	const browser = typeof window !== 'undefined';
	const scaleProps = browser ? { from, to, duration, delay, ease, disabled } : { from, to, duration, delay, ease, disabled: true };
</script>

<svelte:element this={element} use:gsapScale={scaleProps} class={className}>
	<slot />
</svelte:element>
