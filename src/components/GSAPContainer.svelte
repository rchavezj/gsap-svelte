<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { GSAPContainerOptions, ElementType } from '../types';

	interface Props {
		element?: ElementType;
		layout?: GSAPContainerOptions['layout'];
		gridCols?: number;
		gridRows?: number;
		gap?: string;
		width?: string;
		height?: string;
		containerRef?: HTMLElement;
		class?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		element = 'div',
		layout = 'grid',
		gridCols = 4,
		gridRows = 4,
		gap = '0',
		width = undefined,
		height = undefined,
		containerRef = $bindable(undefined),
		class: className = '',
		children,
		...restProps
	}: Props = $props();

	// Compute display style based on layout
	const displayStyle = $derived(layout === 'grid' ? 'grid' : layout === 'flex' ? 'flex' : 'block');

	// Compute grid template styles
	const gridTemplateColumns = $derived(layout === 'grid' ? `repeat(${gridCols}, 1fr)` : undefined);
	const gridTemplateRows = $derived(layout === 'grid' ? `repeat(${gridRows}, 1fr)` : undefined);
</script>

<svelte:element
	this={element}
	bind:this={containerRef}
	class="gsap-container {className}"
	style:display={displayStyle}
	style:grid-template-columns={gridTemplateColumns}
	style:grid-template-rows={gridTemplateRows}
	style:gap={gap}
	style:width={width}
	style:height={height}
	style:position="relative"
	{...restProps}
>
	{@render children?.()}
</svelte:element>
