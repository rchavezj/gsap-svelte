import { Component } from 'svelte';

declare const GsapDraggable: Component<{
	element?: import('../types').ElementType;
	type?: string;
	inertia?: boolean;
	bounds?: any;
	disabled?: boolean;
	class?: string;
	[key: string]: any;
}>;

export default GsapDraggable;
