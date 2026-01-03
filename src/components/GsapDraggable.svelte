<script lang="ts">
	import { gsapDraggable } from '../actions';
	import type { GSAPDraggableOptions, ElementType } from '../types';
	import type { Snippet } from 'svelte';

	interface Props {
		element?: ElementType;
		type?: GSAPDraggableOptions['type'];
		inertia?: boolean;
		bounds?: GSAPDraggableOptions['bounds'];
		disabled?: boolean;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	const {
		element = 'div',
		type = 'x,y',
		inertia = false,
		bounds = undefined,
		disabled = false,
		class: className = '',
		children,
		...restProps
	}: Props = $props();

	const browser = typeof window !== 'undefined';

	const draggableProps: GSAPDraggableOptions = $derived(browser ? {
		type,
		inertia,
		bounds,
		disabled,
		...restProps
	} : { disabled: true });
</script>

<svelte:element this={element} use:gsapDraggable={draggableProps} class={className}>
	{@render children?.()}
</svelte:element>
