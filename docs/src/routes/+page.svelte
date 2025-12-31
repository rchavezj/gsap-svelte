<script lang="ts">
	import GsapAnimate from '@gsap/svelte/components/GsapAnimate.svelte';
	import GsapFade from '@gsap/svelte/components/GsapFade.svelte';
	import GsapSlide from '@gsap/svelte/components/GsapSlide.svelte';
	import GsapScale from '@gsap/svelte/components/GsapScale.svelte';

	const features = [
		{
			icon: '⚡',
			title: 'High Performance',
			description: 'Leverages GSAP\'s industry-leading animation performance for smooth 60fps animations'
		},
		{
			icon: '🧹',
			title: 'Automatic Cleanup',
			description: 'No memory leaks - animations are automatically cleaned up on component unmount'
		},
		{
			icon: '📘',
			title: 'TypeScript First',
			description: 'Full type definitions included for the best developer experience and autocomplete'
		},
		{
			icon: '🎯',
			title: 'ScrollTrigger Ready',
			description: 'Built-in support for GSAP ScrollTrigger with zero configuration needed'
		},
		{
			icon: '🎨',
			title: 'Component-Based',
			description: 'Use clean, composable Svelte components for all your animation needs'
		},
		{
			icon: '🔄',
			title: 'SSR Safe',
			description: 'Works seamlessly with SvelteKit server-side rendering out of the box'
		}
	];

	const floatingIcons = [
		{ emoji: '⚡', label: 'GSAP', position: { top: '15%', right: '15%' } },
		{ emoji: '🔥', label: 'Svelte', position: { top: '30%', right: '8%' } },
		{ emoji: '🎯', label: 'TypeScript', position: { top: '50%', right: '12%' } },
		{ emoji: '🚀', label: 'Fast', position: { top: '65%', right: '18%' } },
		{ emoji: '✨', label: 'Smooth', position: { top: '40%', right: '25%' } },
		{ emoji: '💚', label: 'Modern', position: { top: '20%', right: '30%' } },
		{ emoji: '🎨', label: 'Beautiful', position: { bottom: '25%', right: '10%' } }
	];
</script>

<!-- Animated Background Shapes -->
<div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
	<GsapAnimate type="to" rotation={360} duration={40} ease="none" repeat={-1}>
		<div class="absolute -top-40 -right-40 w-96 h-96 bg-gsap-green/5 rounded-full blur-3xl"></div>
	</GsapAnimate>
	<GsapAnimate type="to" rotation={-360} duration={50} ease="none" repeat={-1}>
		<div class="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
	</GsapAnimate>
</div>

<div class="relative">
	<!-- Hero Section -->
	<section class="min-h-screen flex items-center justify-center px-6 py-20">
		<div class="max-w-6xl mx-auto text-center">
			<GsapFade duration={1} delay={0.2}>
				<div class="inline-block px-4 py-1.5 bg-gsap-green/10 border border-gsap-green/20 rounded-full text-gsap-green text-sm font-medium mb-8">
					All GSAP plugins now FREE in 2025
				</div>
			</GsapFade>

			<GsapSlide direction="up" distance={30} duration={1} delay={0.3}>
				<h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
					The GSAP integration
					<br />
					<span class="bg-gradient-to-r from-gsap-green via-green-400 to-emerald-500 bg-clip-text text-transparent">
						for Svelte
					</span>
				</h1>
			</GsapSlide>

			<GsapFade duration={1} delay={0.5}>
				<p class="text-xl md:text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed">
					Powerful animations with automatic cleanup, full TypeScript support, and zero configuration. Get started in 2 lines of code.
				</p>
			</GsapFade>

			<GsapSlide direction="up" distance={20} duration={0.8} delay={0.7}>
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
					<a
						href="/docs/getting-started"
						class="px-8 py-4 bg-gsap-green text-black font-semibold rounded-lg hover:bg-green-400 transition-all duration-200 shadow-lg shadow-gsap-green/20 hover:shadow-gsap-green/40 hover:scale-105 no-underline"
					>
						Get Started →
					</a>
					<a
						href="https://github.com/rchavezj/gsap-svelte"
						target="_blank"
						rel="noopener noreferrer"
						class="px-8 py-4 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-all duration-200 border border-neutral-700 hover:border-neutral-600 no-underline"
					>
						View on GitHub
					</a>
				</div>
			</GsapSlide>

			<!-- Code Example -->
			<GsapScale from={0.9} duration={1} delay={0.9}>
				<div class="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
					<pre class="text-left text-sm overflow-x-auto"><code class="language-svelte">{`<script>
  import { GsapAnimate } from '@gsap/svelte';
</script>

<GsapAnimate type="from" opacity={0} y={50} duration={1}>
  <div>Beautiful animations in 2 lines!</div>
</GsapAnimate>`}</code></pre>
				</div>
			</GsapScale>
		</div>
	</section>

	<!-- Features Grid -->
	<section class="py-32 px-6">
		<div class="max-w-6xl mx-auto">
			<GsapFade duration={1}>
				<div class="text-center mb-20">
					<h2 class="text-5xl font-bold mb-4">Everything you need</h2>
					<p class="text-xl text-neutral-400">Built for modern Svelte development</p>
				</div>
			</GsapFade>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each features as feature, i}
					<GsapSlide direction="up" distance={40} duration={0.8} delay={1.2 + (i * 0.1)}>
						<div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-gsap-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-gsap-green/10 h-full">
							<div class="text-5xl mb-6">{feature.icon}</div>
							<h3 class="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
							<p class="text-neutral-400 leading-relaxed">{feature.description}</p>
						</div>
					</GsapSlide>
				{/each}
			</div>
		</div>
	</section>

	<!-- Component Showcase -->
	<section class="py-32 px-6 bg-neutral-900/50">
		<div class="max-w-6xl mx-auto">
			<GsapFade duration={1}>
				<div class="text-center mb-20">
					<h2 class="text-5xl font-bold mb-4">See it in action</h2>
					<p class="text-xl text-neutral-400">Live component demonstrations</p>
				</div>
			</GsapFade>

			<div class="grid md:grid-cols-3 gap-8">
				<GsapAnimate
					type="from"
					opacity={0}
					x={-100}
					duration={1}
					delay={2}
					ease="back.out(1.7)"
				>
					<div class="h-64 bg-gradient-to-br from-gsap-green to-green-600 rounded-2xl flex items-center justify-center text-black font-bold text-3xl shadow-2xl">
						Fade
					</div>
				</GsapAnimate>

				<GsapSlide
					direction="down"
					distance={100}
					duration={1}
					delay={2.2}
					ease="back.out(1.7)"
				>
					<div class="h-64 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl">
						Slide
					</div>
				</GsapSlide>

				<GsapScale
					from={0}
					duration={1}
					delay={2.4}
					ease="back.out(1.7)"
				>
					<div class="h-64 bg-gradient-to-br from-green-400 to-lime-500 rounded-2xl flex items-center justify-center text-black font-bold text-3xl shadow-2xl">
						Scale
					</div>
				</GsapScale>
			</div>

			<GsapFade duration={1} delay={2.6}>
				<div class="text-center mt-16">
					<a
						href="/docs/actions"
						class="inline-block px-8 py-4 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-all duration-200 border border-neutral-700 hover:border-gsap-green no-underline"
					>
						Explore All Components →
					</a>
				</div>
			</GsapFade>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-32 px-6">
		<div class="max-w-4xl mx-auto">
			<GsapScale from={0.95} duration={1} delay={0.5}>
				<div class="bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700 rounded-3xl p-16 text-center shadow-2xl">
					<h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
					<p class="text-xl text-neutral-400 mb-10">Install @gsap/svelte and start animating in minutes</p>

					<div class="bg-black rounded-xl p-6 max-w-xl mx-auto mb-10">
						<code class="text-gsap-green text-lg">bun add @gsap/svelte gsap</code>
					</div>

					<a
						href="/docs/getting-started"
						class="inline-block px-10 py-5 bg-gsap-green text-black font-semibold rounded-lg hover:bg-green-400 transition-all duration-200 shadow-lg shadow-gsap-green/20 hover:shadow-gsap-green/40 hover:scale-105 text-lg no-underline"
					>
						View Documentation →
					</a>
				</div>
			</GsapScale>
		</div>
	</section>
</div>

<style>
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	}
</style>
