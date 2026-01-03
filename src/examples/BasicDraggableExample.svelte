<script lang="ts">
	/**
	 * Basic Example: Using GSAPContainer and GsapDraggable components
	 *
	 * This example shows the minimal setup to replace the original markup:
	 *
	 * BEFORE:
	 * <div bind:this={gridContainer} class="grid-container">
	 *   {#each Array(16) as _}
	 *     <div class="grid-cell"></div>
	 *   {/each}
	 *   {#if isReady}
	 *     <div bind:this={ballElement} use:gsapDraggable={draggableOptions} class="ball"></div>
	 *   {/if}
	 * </div>
	 *
	 * AFTER (using components):
	 * <GSAPContainer bind:containerRef={gridContainer} layout="grid" gridCols={4} gridRows={4}>
	 *   {#each Array(16) as _}
	 *     <div class="grid-cell"></div>
	 *   {/each}
	 *   {#if isReady}
	 *     <GsapDraggable bind:element={ballElement} type="x,y" bounds={gridContainer} inertia={true}>
	 *       <div class="ball"></div>
	 *     </GsapDraggable>
	 *   {/if}
	 * </GSAPContainer>
	 */

	import GSAPContainer from '../components/GSAPContainer.svelte';
	import GsapDraggable from '../components/GsapDraggable.svelte';

	let gridContainer: HTMLElement | undefined;
	let ballElement: HTMLElement | undefined;
	let isReady = $state(false);

	$effect(() => {
		if (gridContainer) {
			isReady = true;
		}
	});
</script>

<!-- Component-based approach -->
<GSAPContainer
	bind:containerRef={gridContainer}
	layout="grid"
	gridCols={4}
	gridRows={4}
	width="400px"
	height="400px"
	gap="0"
	class="my-grid-container"
>
	<!-- Grid cells -->
	{#each Array(16) as _}
		<div class="grid-cell"></div>
	{/each}

	<!-- Draggable element - only render when grid is ready -->
	{#if isReady}
		<GsapDraggable
			bind:element={ballElement}
			type="x,y"
			bounds={gridContainer}
			inertia={true}
			snap={{
				x: (value: number) => Math.round(value / 100) * 100,
				y: (value: number) => Math.round(value / 100) * 100
			}}
			onDragStart={() => {
				console.log('Drag started');
			}}
			onDragEnd={() => {
				console.log('Drag ended');
			}}
		>
			<div class="ball"></div>
		</GsapDraggable>
	{/if}
</GSAPContainer>

<style>
	:global(.my-grid-container) {
		background: rgba(15, 15, 25, 0.6);
		border: 2px solid rgba(91, 80, 255, 0.3);
		border-radius: 24px;
		backdrop-filter: blur(10px);
		box-shadow:
			0 0 40px rgba(91, 80, 255, 0.2),
			inset 0 0 60px rgba(91, 80, 255, 0.05);
	}

	.grid-cell {
		border: 1px solid rgba(91, 80, 255, 0.15);
		background: rgba(255, 255, 255, 0.02);
	}

	.ball {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background: linear-gradient(135deg, #5b50ff 0%, #8b7eff 100%);
		cursor: grab;
		box-shadow:
			0 10px 40px rgba(91, 80, 255, 0.6),
			0 0 0 4px rgba(91, 80, 255, 0.2);
	}

	.ball:active {
		cursor: grabbing;
	}
</style>
