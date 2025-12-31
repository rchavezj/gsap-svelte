<script lang="ts">
	import { gsapFade } from '../actions';

	type ElementType = 'div' | 'span' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'aside' | 'nav';

	export let element: ElementType = 'div';
	export let duration: number = 1;
	export let delay: number = 0;
	export let ease: string = 'power2.out';
	export let disabled: boolean = false;

	let className: string = '';
	export { className as class };

	const browser = typeof window !== 'undefined';
	const fadeProps = browser ? { duration, delay, ease, disabled } : { duration, delay, ease, disabled: true };
</script>

<svelte:element this={element} use:gsapFade={fadeProps} class={className}>
	<slot />
</svelte:element>
