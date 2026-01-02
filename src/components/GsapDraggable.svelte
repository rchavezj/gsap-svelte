<script lang="ts">
	import { gsapDraggable } from '../actions';
	import type { GSAPDraggableOptions, ElementType } from '../types';

	export let element: ElementType = 'div';
	export let type: GSAPDraggableOptions['type'] = 'x,y';
	export let inertia: boolean = false;
	export let bounds: GSAPDraggableOptions['bounds'] = undefined;
	export let disabled: boolean = false;

	let className: string = '';
	export { className as class };

	// Capture all other props as draggable options
	$$restProps;

	const browser = typeof window !== 'undefined';
	const draggableProps: GSAPDraggableOptions = browser ? {
		type,
		inertia,
		bounds,
		disabled,
		...$$restProps
	} : { disabled: true };
</script>

<svelte:element this={element} use:gsapDraggable={draggableProps} class={className}>
	<slot />
</svelte:element>
