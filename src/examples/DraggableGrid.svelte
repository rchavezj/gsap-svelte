<script lang="ts">
	import { gsap } from 'gsap';
	import GSAPContainer from '../components/GSAPContainer.svelte';
	import GsapDraggable from '../components/GsapDraggable.svelte';
	import type { GSAPDraggableOptions } from '../types';

	// Component props for customization
	export let gridCols: number = 4;
	export let gridRows: number = 4;
	export let cellSize: number = 100;
	export let ballSize: number = 100;
	export let enableInertia: boolean = true;
	export let enableSnap: boolean = true;
	export let snapOffset: number = 0;

	// Customizable callbacks
	export let onDragStart: (() => void) | undefined = undefined;
	export let onDrag: (() => void) | undefined = undefined;
	export let onDragEnd: (() => void) | undefined = undefined;

	// Grid container reference
	let gridContainer: HTMLElement | undefined;
	let ballElement: HTMLElement | undefined;
	let isReady = $state(false);

	// Computed dimensions
	const containerWidth = `${gridCols * cellSize}px`;
	const containerHeight = `${gridRows * cellSize}px`;

	// Snap function to align with grid cells
	const snapToGrid = (value: number) => {
		return Math.round(value / cellSize) * cellSize + snapOffset;
	};

	// Default drag start handler with scale animation
	const defaultDragStart = () => {
		if (ballElement) {
			gsap.to(ballElement, {
				scale: 1.1,
				duration: 0.2,
				ease: 'power2.out'
			});
		}
	};

	// Default drag end handler with elastic animation
	const defaultDragEnd = () => {
		if (ballElement) {
			gsap.to(ballElement, {
				scale: 1,
				duration: 0.3,
				ease: 'elastic.out(1, 0.5)'
			});
		}
	};

	// Reactive draggable options
	let draggableOptions = $derived.by(() => {
		if (!gridContainer) {
			return { disabled: true } as GSAPDraggableOptions;
		}

		const options: GSAPDraggableOptions = {
			type: 'x,y',
			bounds: gridContainer,
			inertia: enableInertia,
			onDragStart: onDragStart || defaultDragStart,
			onDrag: onDrag,
			onDragEnd: onDragEnd || defaultDragEnd
		};

		if (enableSnap) {
			options.snap = {
				x: snapToGrid,
				y: snapToGrid
			};
		}

		return options;
	});

	// Set ready state when container is available
	$effect(() => {
		if (gridContainer) {
			isReady = true;
		}
	});

	// Total number of grid cells
	const totalCells = gridCols * gridRows;
</script>

<GSAPContainer
	bind:containerRef={gridContainer}
	layout="grid"
	{gridCols}
	{gridRows}
	width={containerWidth}
	height={containerHeight}
	gap="0"
	class="draggable-grid-container {$$props.class || ''}"
>
	<!-- Grid cells - allow customization via slot -->
	<slot name="cells" {totalCells}>
		{#each Array(totalCells) as _, i}
			<div class="grid-cell" data-cell-index={i}>
				<slot name="cell" cellIndex={i} />
			</div>
		{/each}
	</slot>

	<!-- Draggable element - only render when grid is ready -->
	{#if isReady}
		<GsapDraggable
			bind:element={ballElement}
			{...draggableOptions}
			class="draggable-element {$$props.draggableClass || ''}"
			style:width={`${ballSize}px`}
			style:height={`${ballSize}px`}
			style:position="absolute"
			style:top="0"
			style:left="0"
		>
			<slot name="draggable">
				<div class="default-ball"></div>
			</slot>
		</GsapDraggable>
	{/if}
</GSAPContainer>

<style>
	/* Base grid cell styles - can be overridden by parent */
	:global(.grid-cell) {
		border: 1px solid rgba(91, 80, 255, 0.15);
		background: rgba(255, 255, 255, 0.02);
		transition: all 0.3s ease;
	}

	:global(.grid-cell:hover) {
		background: rgba(91, 80, 255, 0.08);
	}

	/* Default draggable element styles */
	:global(.draggable-element) {
		cursor: grab;
		z-index: 10;
	}

	:global(.draggable-element:active) {
		cursor: grabbing;
	}

	/* Default ball appearance */
	.default-ball {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: linear-gradient(135deg, #5b50ff 0%, #8b7eff 100%);
		box-shadow:
			0 10px 40px rgba(91, 80, 255, 0.6),
			0 0 0 4px rgba(91, 80, 255, 0.2),
			inset 0 -8px 20px rgba(0, 0, 0, 0.3),
			inset 0 8px 20px rgba(255, 255, 255, 0.3);
	}

	.default-ball::before {
		content: '';
		position: absolute;
		top: 15%;
		left: 20%;
		width: 30px;
		height: 30px;
		background: radial-gradient(
			circle at 30% 30%,
			rgba(255, 255, 255, 0.8),
			transparent
		);
		border-radius: 50%;
		filter: blur(4px);
	}
</style>
