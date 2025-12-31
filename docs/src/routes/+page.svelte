<script lang="ts">
	import { gsapAnimate } from '@gsap/svelte';
	import GsapAnimate from '@gsap/svelte/components/GsapAnimate.svelte';
	import GsapFade from '@gsap/svelte/components/GsapFade.svelte';
	import GsapSlide from '@gsap/svelte/components/GsapSlide.svelte';
	import GsapScale from '@gsap/svelte/components/GsapScale.svelte';

	let showComponents = false;

	const features = [
		{
			icon: '✨',
			title: 'Two APIs',
			description: 'Use Svelte actions or component wrappers - choose what fits your style'
		},
		{
			icon: '🧹',
			title: 'Automatic Cleanup',
			description: 'No memory leaks - animations are automatically cleaned up on unmount'
		},
		{
			icon: '📘',
			title: 'TypeScript First',
			description: 'Full type definitions included for the best developer experience'
		},
		{
			icon: '🎯',
			title: 'ScrollTrigger Ready',
			description: 'Built-in support for GSAP ScrollTrigger with zero configuration'
		},
		{
			icon: '⚡',
			title: 'High Performance',
			description: 'Leverages GSAP\'s industry-leading animation performance'
		},
		{
			icon: '🔄',
			title: 'SSR Safe',
			description: 'Works seamlessly with SvelteKit server-side rendering'
		}
	];
</script>

<div class="max-w-6xl mx-auto">
	<!-- Hero Section -->
	<section class="py-20 px-4 text-center">
		<div 
			use:gsapAnimate={{
				type: 'from',
				opacity: 0,
				y: -30,
				duration: 1,
				ease: 'power2.out'
			}}
		>
			<h1 class="text-6xl font-bold mb-6 bg-gradient-to-r from-gsap-green via-green-400 to-emerald-500 bg-clip-text text-transparent">
				@gsap/svelte
			</h1>
			<p class="text-2xl text-neutral-400 mb-8 max-w-3xl mx-auto">
				Official Svelte integration for <span class="text-gsap-green font-semibold">GSAP</span>
				<br />
				<span class="text-lg">
					Powerful animations with automatic cleanup and full TypeScript support
				</span>
			</p>
		</div>

		<div 
			class="flex gap-4 justify-center mb-16"
			use:gsapAnimate={{
				type: 'from',
				opacity: 0,
				y: 20,
				duration: 0.8,
				delay: 0.3,
				ease: 'power2.out'
			}}
		>
			<a
				href="/docs/getting-started"
				class="px-8 py-3 bg-gsap-green text-black font-semibold rounded-lg hover:bg-green-400 transition-colors no-underline"
			>
				Get Started
			</a>
			<a
				href="https://github.com/rchavezj/gsap-svelte"
				target="_blank"
				rel="noopener noreferrer"
				class="px-8 py-3 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-colors no-underline"
			>
				GitHub
			</a>
		</div>

		<!-- API Comparison -->
		<div
			class="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 mb-12"
			use:gsapAnimate={{
				type: 'from',
				opacity: 0,
				y: 30,
				duration: 1,
				delay: 0.5,
				ease: 'power2.out'
			}}
		>
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-xl font-semibold text-white">Two Ways to Animate</h3>
				<div class="flex gap-2 bg-neutral-800 p-1 rounded-lg">
					<button
						onclick={() => showComponents = false}
						class="px-4 py-2 rounded {!showComponents ? 'bg-gsap-green text-black' : 'text-neutral-400'} font-medium transition-colors"
					>
						Actions
					</button>
					<button
						onclick={() => showComponents = true}
						class="px-4 py-2 rounded {showComponents ? 'bg-gsap-green text-black' : 'text-neutral-400'} font-medium transition-colors"
					>
						Components
					</button>
				</div>
			</div>

			<div class="max-w-2xl mx-auto">
				{#if !showComponents}
					<pre class="text-sm"><code class="language-svelte">{`<script>
  import { gsapAnimate } from '@gsap/svelte';
</script>

<div use:gsapAnimate={{
  type: 'from',
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power2.out'
}}>
  Animated with action!
</div>`}</code></pre>
				{:else}
					<pre class="text-sm"><code class="language-svelte">{`<script>
  import { GsapAnimate } from '@gsap/svelte';
</script>

<GsapAnimate
  type="from"
  opacity={0}
  y={50}
  duration={1}
  ease="power2.out"
>
  <div>Animated with component!</div>
</GsapAnimate>`}</code></pre>
				{/if}
			</div>
		</div>

		<!-- Live Demo -->
		<div
			class="bg-neutral-900 rounded-2xl p-12 border border-neutral-800 mb-20"
			use:gsapAnimate={{
				type: 'from',
				opacity: 0,
				scale: 0.95,
				duration: 1,
				delay: 0.8,
				ease: 'power2.out'
			}}
		>
			<h3 class="text-2xl font-semibold mb-6 text-white">Live Demo with Components</h3>

			<div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
				<GsapAnimate
					type="from"
					opacity={0}
					x={-100}
					duration={1}
					delay={1.2}
					ease="back.out(1.7)"
				>
					<div class="h-32 bg-gradient-to-br from-gsap-green to-green-600 rounded-lg flex items-center justify-center text-black font-bold text-xl shadow-lg">
						Fade
					</div>
				</GsapAnimate>

				<GsapSlide
					direction="down"
					distance={100}
					duration={1}
					delay={1.4}
					ease="back.out(1.7)"
				>
					<div class="h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
						Slide
					</div>
				</GsapSlide>

				<GsapScale
					from={0}
					duration={1}
					delay={1.6}
					ease="back.out(1.7)"
				>
					<div class="h-32 bg-gradient-to-br from-green-400 to-lime-500 rounded-lg flex items-center justify-center text-black font-bold text-xl shadow-lg">
						Scale
					</div>
				</GsapScale>
			</div>

			<div class="mt-8 text-left max-w-2xl mx-auto">
				<pre class="text-sm"><code class="language-svelte">{`<GsapAnimate type="from" opacity={0} x={-100} duration={1}>
  <div>Fade</div>
</GsapAnimate>

<GsapSlide direction="down" distance={100}>
  <div>Slide</div>
</GsapSlide>

<GsapScale from={0}>
  <div>Scale</div>
</GsapScale>`}</code></pre>
			</div>
		</div>
	</section>

	<!-- Features Grid -->
	<section class="px-4 pb-20">
		<h2 class="text-4xl font-bold text-center mb-12 text-white">Features</h2>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each features as feature, i}
				<div
					class="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-gsap-green transition-colors"
					use:gsapAnimate={{
						type: 'from',
						opacity: 0,
						y: 30,
						duration: 0.6,
						delay: 2 + (i * 0.1),
						ease: 'power2.out'
					}}
				>
					<div class="text-4xl mb-4">{feature.icon}</div>
					<h3 class="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
					<p class="text-neutral-400">{feature.description}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Quick Start -->
	<section class="px-4 pb-20">
		<div 
			class="bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-12 text-center"
			use:gsapAnimate={{
				type: 'from',
				opacity: 0,
				y: 50,
				duration: 1,
				delay: 2.6,
				ease: 'power2.out'
			}}
		>
			<h2 class="text-3xl font-bold mb-4 text-white">Ready to get started?</h2>
			<p class="text-neutral-400 mb-6 text-lg">Install @gsap/svelte and start animating in minutes</p>
			
			<div class="bg-black rounded-lg p-4 max-w-xl mx-auto mb-6">
				<code class="text-gsap-green">bun add @gsap/svelte gsap</code>
			</div>

			<a
				href="/docs/getting-started"
				class="inline-block px-8 py-3 bg-gsap-green text-black font-semibold rounded-lg hover:bg-green-400 transition-colors no-underline"
			>
				View Documentation →
			</a>
		</div>
	</section>
</div>

<style>
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	}
</style>
