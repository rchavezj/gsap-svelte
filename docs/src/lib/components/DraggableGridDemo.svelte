<script lang="ts">
	import { gsapDraggable } from '@gsap/svelte';
	import type { GSAPDraggableOptions } from '@gsap/svelte';
	import GSAPContainer from '@gsap/svelte/components/GSAPContainer.svelte';
	import GsapDraggable from '@gsap/svelte/components/GsapDraggable.svelte';

	let ballElement = $state<HTMLDivElement>();
	let gridContainer = $state<HTMLDivElement>();
	let isReady = $state(false);

	// Reactive draggable options - recreated when gridContainer changes
	let draggableOptions = $derived.by(() => {
		if (!gridContainer) {
			return { disabled: true };
		}

		return {
			type: 'x,y' as const,
			bounds: gridContainer,
			inertia: true,
			// snap: {
			// 	x: snapToCenter,
			// 	y: snapToCenter
			// },
			snap: {
				x: (value: number) => Math.round(value / 100) * 100,
				y: (value: number) => Math.round(value / 100) * 100 
			},
			onDragStart: function() {
				if (ballElement) {
					gsap.to(ballElement, {
						scale: 1.1,
						duration: 0.2,
						ease: 'power2.out'
					});
				}
			},
			onDragEnd: function() {
				if (ballElement) {
					gsap.to(ballElement, {
						scale: 1,
						duration: 0.3,
						ease: 'elastic.out(1, 0.5)'
					});
				}
			}
		};
	});

	// Snap function to center ball in each 100px cell
	// Ball is 80px, so centered position is cell_index * 100 + 10
	const snapToCenter = (value: number) => {
		const cellIndex = Math.round(value / 100);
		return cellIndex * 100 + 10;
	};


	$effect(() => {
		if (gridContainer) {
			isReady = true;
		}
	});
</script>

<div class="demo-container">
	<div class="demo-header">
		<div class="demo-badge">[ INTERACTIVE DEMO ]</div>
		<h3 class="demo-title">Draggable + Inertia</h3>
		<p class="demo-description">Drag the ball and watch it snap to the grid with physics-based inertia</p>
	</div>

	<!-- <div bind:this={gridContainer} class="grid-container">
		{#each Array(16) as _}
			<div class="grid-cell"></div>
		{/each}

		{#if isReady}
			<div
				bind:this={ballElement}
				use:gsapDraggable={draggableOptions}
				class="ball"
			></div>
		{/if}
	</div> -->

	<!-- <GSAPContainer layout="flex" width="100%" height="200px" gap="1rem">
		{#each Array(16) as _}
			<div class="grid-cell"></div>
		{/each}
		<GsapDraggable type="x" bounds={ballElement} inertia={true} snap={{ x: snapToCenter }}>
			<div class="slider">→</div>
		</GsapDraggable>
	</GSAPContainer> -->
	  <GSAPContainer 
		layout="grid"
		gridCols={4}
		gridRows={4}
		width="400px"
		height="400px"
		class="my-custom-grid"
		bind:containerRef={gridContainer}
	>
		{#each Array(16) as _}
			<div class="grid-cell"></div>
		{/each}
		
		{#if isReady}
			<div
				bind:this={ballElement}
				use:gsapDraggable={{
					type: 'x,y',
					bounds: gridContainer,
					inertia: true,
					snap: {
						x: (value: number) => Math.round(value / 100) * 100,
						y: (value: number) => Math.round(value / 100) * 100
					},
					onDragStart: function() {
						if (ballElement) {
							gsap.to(ballElement, {
								scale: 1.1,
								duration: 0.2,
								ease: 'power2.out'
							});
						}
					},
					onDragEnd: function() {
						if (ballElement) {
							gsap.to(ballElement, {
								scale: 1,
								duration: 0.3,
								ease: 'elastic.out(1, 0.5)'
							});
						}
					}
				}}
				class="ball"
			></div>
		{/if}
	</GSAPContainer>


	<div class="demo-hint">
		<svg class="hint-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path>
		</svg>
		<span>Try dragging the ball around!</span>
	</div>
</div>

<style>
	.demo-container {
		position: relative;
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	.demo-header {
		text-align: center;
		margin-bottom: 32px;
	}

	.demo-badge {
		display: inline-block;
		color: rgba(255, 255, 255, 0.6);
		font-family: 'DM Mono', monospace;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		margin-bottom: 12px;
		padding: 6px 16px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50px;
	}

	.demo-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 8px;
		background: linear-gradient(153deg, #732cff 35%, #f46d6b);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.demo-description {
		font-size: 0.95rem;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.5;
	}

	.grid-container {
		position: relative;
		width: 400px;
		height: 400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		gap: 0;
		background: rgba(15, 15, 25, 0.6);
		border: 2px solid rgba(91, 80, 255, 0.3);
		border-radius: 24px;
		padding: 0;
		backdrop-filter: blur(10px);
		box-shadow:
			0 0 40px rgba(91, 80, 255, 0.2),
			inset 0 0 60px rgba(91, 80, 255, 0.05);
	}

	.grid-cell {
		border: 1px solid rgba(91, 80, 255, 0.15);
		background: rgba(255, 255, 255, 0.02);
		transition: all 0.3s ease;
	}

	.grid-cell:hover {
		background: rgba(91, 80, 255, 0.08);
	}

	.draggable-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* Removed pointer-events: none to allow dragging to work */
	}

	.ball {
		position: absolute;
		width: 100px;
		height: 100px;
		top: 0px;
		left: 0px;
		border-radius: 50%;
		background: linear-gradient(135deg, #5B50FF 0%, #8B7EFF 100%);
		cursor: grab;
		pointer-events: auto;
		box-shadow:
			0 10px 40px rgba(91, 80, 255, 0.6),
			0 0 0 4px rgba(91, 80, 255, 0.2),
			inset 0 -8px 20px rgba(0, 0, 0, 0.3),
			inset 0 8px 20px rgba(255, 255, 255, 0.3);
		transition: box-shadow 0.3s ease;
		z-index: 10;
	}

	.ball:active {
		cursor: grabbing;
		box-shadow:
			0 15px 60px rgba(91, 80, 255, 0.8),
			0 0 0 6px rgba(91, 80, 255, 0.3),
			inset 0 -8px 20px rgba(0, 0, 0, 0.3),
			inset 0 8px 20px rgba(255, 255, 255, 0.3);
	}

	.ball::before {
		content: '';
		position: absolute;
		top: 15%;
		left: 20%;
		width: 30px;
		height: 30px;
		background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent);
		border-radius: 50%;
		filter: blur(4px);
	}

	.demo-hint {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-top: 24px;
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.9rem;
	}

	.hint-icon {
		width: 20px;
		height: 20px;
	}

	@media (max-width: 640px) {
		.grid-container {
			width: 320px;
			height: 320px;
		}

		.ball {
			width: 64px;
			height: 64px;
		}

		.ball::before {
			width: 24px;
			height: 24px;
		}

		.demo-title {
			font-size: 1.5rem;
		}
	}
</style>
