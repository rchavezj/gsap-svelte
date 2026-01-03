import { Component } from 'svelte';

declare const GSAPContainer: Component<{
	element?: import('../types').ElementType;
	layout?: 'grid' | 'flex' | 'none';
	gridCols?: number;
	gridRows?: number;
	gap?: string;
	width?: string;
	height?: string;
	containerRef?: HTMLElement;
	class?: string;
}>;

export default GSAPContainer;
