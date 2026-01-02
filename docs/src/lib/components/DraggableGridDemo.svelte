<script lang="ts">
	import { gsap } from '@gsap/svelte';
	import { gsapDraggable } from '@gsap/svelte';

	let ballElement: HTMLDivElement;
	let gridContainer: HTMLDivElement;
	let isReady = $state(false);

	// Reactive draggable options - recreated when gridContainer changes
	let draggableOptions = $derived({
		type: 'x,y' as const,
		bounds: gridContainer,
		inertia: true,
		snap: {
			x: (value: number) => Math.round(value / 100) * 100,
			y: (value: number) => Math.round(value / 100) * 100
		},
		onDragStart: function() {
			gsap.to(ballElement, {
				scale: 1.1,
				duration: 0.2,
				ease: 'power2.out'
			});
		},
		onDragEnd: function() {
			gsap.to(ballElement, {
				scale: 1,
				duration: 0.3,
				ease: 'elastic.out(1, 0.5)'
			});
		}
	});

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

	<div bind:this={gridContainer} class="grid-container">
		<!-- Grid cells -->
		{#each Array(16) as _}
			<div class="grid-cell"></div>
		{/each}

		<!-- Draggable ball using @gsap/svelte - only render when grid is ready -->
		{#if isReady}
			<div
				bind:this={ballElement}
				use:gsapDraggable={draggableOptions}
				class="ball"
			></div>
		{/if}
	</div>

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

	.ball {
		position: absolute;
		width: 80px;
		height: 80px;
		top: 10px;
		left: 10px;
		border-radius: 50%;
		background: linear-gradient(135deg, #5B50FF 0%, #8B7EFF 100%);
		cursor: grab;
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
