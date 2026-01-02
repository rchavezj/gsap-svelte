<script lang="ts">
	import '../app.css';
	import GsapAnimate from '@gsap/svelte/components/GsapAnimate.svelte';
	import GsapFade from '@gsap/svelte/components/GsapFade.svelte';
	import GsapSlide from '@gsap/svelte/components/GsapSlide.svelte';
	import GsapScale from '@gsap/svelte/components/GsapScale.svelte';
	import DraggableGridDemo from '$lib/components/DraggableGridDemo.svelte';

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

<!-- Optimatia-style Radial Glow Background Effects -->
<div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
	<GsapAnimate type="to" opacity={0.6} duration={3} ease="sine.inOut" repeat={-1} yoyo={true}>
		<div class="radial-glow radial-glow-purple"></div>
	</GsapAnimate>
	<GsapAnimate type="to" opacity={0.5} duration={4} ease="sine.inOut" repeat={-1} yoyo={true}>
		<div class="radial-glow radial-glow-orange"></div>
	</GsapAnimate>
	<!-- Additional Optimatia-style radial overlay for depth -->
	<div class="radial-overlay"></div>
</div>

<div class="relative bg-gradient-to-b from-[#0a0a0f] via-[#0B2641] to-[#1a1a2e]">
	<!-- Hero Section - Enhanced with Optimatia styling -->
	<section class="hero-section">
		<!-- Decorative floating icons with Optimatia-style animations -->
		<div class="floating-icons-container">
			{#each floatingIcons as icon, i}
				<GsapAnimate
					type="from"
					opacity={0}
					scale={0}
					duration={1}
					delay={0.8 + (i * 0.1)}
					ease="back.out(1.7)"
				>
					<GsapAnimate
						type="to"
						y={15}
						duration={2.5 + (i * 0.3)}
						ease="sine.inOut"
						repeat={-1}
						yoyo={true}
					>
						<div
							class="floating-icon"
							style="top: {icon.position.top || 'auto'}; bottom: {icon.position.bottom || 'auto'}; right: {icon.position.right};"
						>
							{icon.emoji}
						</div>
					</GsapAnimate>
				</GsapAnimate>
			{/each}
		</div>

		<div class="hero-content">
			<!-- Category Badge - Optimatia style -->
			

			<div>
				<GsapFade duration={0.8} delay={0.2}>
				<div class="hero-badge">
					<span class="hero-badge-text">[ GSAP + SVELTE ]</span>
				</div>
				</GsapFade>
			</div>


			<div class="hero-grid">
				<div class="hero-text">
					<!-- Main Heading - Optimatia gradient text -->
					<GsapSlide direction="up" distance={30} duration={1} delay={0.3}>
						<h1 class="hero-heading">
							Animate smarter,
							<br />
							<span class="hero-heading-gradient">
								build faster,
							</span>
							<br />
							scale better
						</h1>
					</GsapSlide>

					<!-- Description - Optimatia styling -->
					<GsapFade duration={1} delay={0.5}>
						<p class="hero-description">
							The ultimate GSAP foundation for high-performance, scalable, modern web applications. Powerful animations with automatic cleanup, full TypeScript support, and zero configuration.
						</p>
					</GsapFade>

					<!-- Gradient CTA Buttons - Optimatia style -->
					<GsapSlide direction="up" distance={20} duration={0.8} delay={0.7}>
						<div class="cta-container">
							<a href="/docs/getting-started" class="cta-button cta-primary">
								<span class="cta-content">
									<span class="cta-text">Get Started</span>
									<svg class="cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
									</svg>
								</span>
								<!-- Optimatia-style star icon -->
								<span class="cta-star">✨</span>
							</a>
							<a
								href="https://github.com/rchavezj/gsap-svelte"
								target="_blank"
								rel="noopener noreferrer"
								class="cta-button cta-secondary"
							>
								View on GitHub
							</a>
						</div>
					</GsapSlide>

					<!-- Code Example with enhanced Optimatia styling -->
					<GsapScale from={0.9} duration={1} delay={0.9}>
						<div class="code-showcase">
							<div class="code-glow"></div>
							<pre class="code-content"><code class="language-svelte">{`<script>
  import { GsapAnimate } from '@gsap/svelte';
</script>

<GsapAnimate type="from" opacity={0} y={50} duration={1}>
  <div>Beautiful animations in 2 lines!</div>
</GsapAnimate>`}</code></pre>
						</div>
					</GsapScale>
				</div>

				<!-- Draggable Grid Demo -->
				<div class="hero-demo">
					<GsapFade duration={1} delay={1.1}>
						<DraggableGridDemo />
					</GsapFade>
				</div>
			</div>

			
			

			

			
		</div>
	</section>

	<!-- Features Grid - Enhanced with Optimatia card styling -->
	<section class="features-section">
		<div class="section-container">
			<GsapFade duration={1}>
				<div class="section-header">
					<span class="section-badge">[ FEATURES ]</span>
					<h2 class="section-title">Everything you need</h2>
					<p class="section-subtitle">Built for modern Svelte development</p>
				</div>
			</GsapFade>

			<div class="features-grid">
				{#each features as feature, i}
					<GsapSlide direction="up" distance={40} duration={0.8} delay={1.2 + (i * 0.1)}>
						<div class="feature-card">
							<div class="feature-card-glow"></div>
							<div class="feature-icon">{feature.icon}</div>
							<h3 class="feature-title">{feature.title}</h3>
							<p class="feature-description">{feature.description}</p>
						</div>
					</GsapSlide>
				{/each}
			</div>
		</div>
	</section>

	<!-- Component Showcase - Optimatia enhanced -->
	<section class="showcase-section">
		<div class="section-container">
			<GsapFade duration={1}>
				<div class="section-header">
					<span class="section-badge">[ LIVE DEMOS ]</span>
					<h2 class="section-title">See it in action</h2>
					<p class="section-subtitle">Live component demonstrations</p>
				</div>
			</GsapFade>

			<div class="showcase-grid">
				<GsapAnimate
					type="from"
					opacity={0}
					x={-100}
					duration={1}
					delay={2}
					ease="back.out(1.7)"
				>
					<div class="showcase-card showcase-fade">
						<div class="showcase-glow"></div>
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
					<div class="showcase-card showcase-slide">
						<div class="showcase-glow"></div>
						Slide
					</div>
				</GsapSlide>

				<GsapScale
					from={0}
					duration={1}
					delay={2.4}
					ease="back.out(1.7)"
				>
					<div class="showcase-card showcase-scale">
						<div class="showcase-glow"></div>
						Scale
					</div>
				</GsapScale>
			</div>

			<GsapFade duration={1} delay={2.6}>
				<div class="showcase-cta">
					<a href="/docs/actions" class="showcase-link">
						Explore All Components →
					</a>
				</div>
			</GsapFade>
		</div>
	</section>

	<!-- CTA Section - Full Optimatia treatment -->
	<section class="final-cta-section">
		<div class="section-container">
			<GsapScale from={0.95} duration={1} delay={0.5}>
				<div class="cta-card">
					<!-- Optimatia decorative gradient overlay -->
					<div class="cta-card-gradient"></div>
					
					<!-- Floating decorative shapes -->
					<div class="cta-decorative-shapes">
						<div class="shape shape-1"></div>
						<div class="shape shape-2"></div>
						<div class="shape shape-3"></div>
					</div>

					<div class="cta-card-content">
						<span class="section-badge">[ GET STARTED ]</span>
						<h2 class="cta-card-title">Ready to get started?</h2>
						<p class="cta-card-subtitle">Install @gsap/svelte and start animating in minutes</p>

						<div class="install-command">
							<code class="command-text">bun add @gsap/svelte gsap</code>
						</div>

						<a href="/docs/getting-started" class="cta-button cta-primary cta-large">
							<span class="cta-content">
								<span class="cta-text">View Documentation</span>
								<svg class="cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
								</svg>
							</span>
							<span class="cta-star">✨</span>
						</a>
					</div>
				</div>
			</GsapScale>
		</div>
	</section>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

	:global(body) {
		font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	}

	/* ====================================
	   OPTIMATIA-INSPIRED BACKGROUND EFFECTS
	   ==================================== */

	.radial-glow {
		position: absolute;
		width: 600px;
		height: 600px;
		border-radius: 50%;
		filter: blur(80px);
	}

	.radial-glow-purple {
		top: 25%;
		left: 25%;
		background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%);
	}

	.radial-glow-orange {
		bottom: 25%;
		right: 25%;
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(244, 96, 74, 0.2) 0%, rgba(244, 96, 74, 0.05) 50%, transparent 100%);
	}

	.radial-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 15, 0.6) 100%);
		pointer-events: none;
	}

	/* ====================================
	   HERO SECTION - OPTIMATIA STYLE
	   ==================================== */

	.hero-section {
		position: relative;
		min-height: 81vh;
		display: flex;
		align-items: center;
		overflow: hidden;
		background-image: url('https://cdn.prod.website-files.com/68a4104899d5bbafe20262c7/68a5bfd32ec0fac7d9925373_optimar-service-hero-star.svg'),url('https://cdn.prod.website-files.com/68a4104899d5bbafe20262c7/68a5bfd32ec0fac7d992537b_optimar-service-hero-background.webp');
		background-size: cover;
		background-position: center;
	}

	.hero-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 15, 0.4) 100%);
		z-index: 1;
		pointer-events: none;
	}

	.floating-icons-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 1;
	}

	.floating-icon {
		position: absolute;
		font-size: 2.5rem;
		opacity: 0.1;
		transition: opacity 0.3s ease;
	}

	.floating-icon:hover {
		opacity: 0.3;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		max-width: 1280px;
		width: 100%;
		margin: 0 auto;
		padding: 0 24px;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 64px;
		align-items: center;
	}

	@media (min-width: 1024px) {
		.hero-grid {
			grid-template-columns: 1fr 1fr;
			gap: 80px;
		}
	}

	.hero-text {
		text-align: center;
	}

	@media (min-width: 1024px) {
		.hero-text {
			text-align: left;
		}
	}

	.hero-demo {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* Hero Badge - Optimatia glass-morphism */
	.hero-badge {
		display: inline-block;
		margin-bottom: 24px;
	}

	.hero-badge-text {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 24px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50px;
		backdrop-filter: blur(10px);
		font-family: 'DM Mono', monospace;
		font-size: 0.875rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.8);
		letter-spacing: 0.05em;
		transition: all 0.3s ease;
	}

	.hero-badge:hover .hero-badge-text {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
	}

	/* Hero Heading - Optimatia gradient text */
	.hero-heading {
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 700;
		line-height: 1.1;
		color: #ffffff;
		margin: 0 0 32px 0;
		letter-spacing: -0.02em;
	}

	.hero-heading-gradient {
		background: linear-gradient(153deg,#732cff 35%,#f46d6b);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Hero Description */
	.hero-description {
		font-size: clamp(1rem, 2vw, 1.25rem);
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.7);
		max-width: 700px;
		margin: 0 auto 48px;
		font-weight: 400;
	}

	/* CTA Container */
	.cta-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
		justify-content: center;
		align-items: center;
		margin-bottom: 64px;
	}

	@media (min-width: 640px) {
		.cta-container {
			flex-direction: row;
		}
	}

	/* CTA Buttons - Optimatia style */
	.cta-button {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 12px;
		padding: 16px 40px;
		font-size: 1rem;
		font-weight: 600;
		border-radius: 50px;
		cursor: pointer;
		overflow: hidden;
		transition: all 0.35s ease;
		text-decoration: none;
		border: none;
	}

	.cta-primary {
		color: #ffffff;
		background: linear-gradient(135deg, #5B50FF 0%, #F4604A 100%);
		box-shadow: 0 10px 40px rgba(91, 80, 255, 0.3);
	}

	.cta-primary:hover {
		transform: translateY(-3px);
		box-shadow: 0 15px 50px rgba(91, 80, 255, 0.5);
	}

	.cta-secondary {
		color: #ffffff;
		background: #15151F;
		box-shadow: 0 4px 50px rgba(0, 0, 0, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.cta-secondary:hover {
		background: #1F1F2E;
		box-shadow: 0 4px 50px rgba(0, 0, 0, 0.1);
		border-color: rgba(91, 80, 255, 0.5);
	}

	.cta-large {
		padding: 20px 48px;
		font-size: 1.125rem;
	}

	.cta-content {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.cta-arrow {
		width: 20px;
		height: 20px;
		transition: transform 0.35s ease;
	}

	.cta-button:hover .cta-arrow {
		transform: translateX(4px);
	}

	.cta-star {
		position: absolute;
		right: 16px;
		opacity: 0;
		transition: all 0.35s ease;
		transform: rotate(0deg);
	}

	.cta-button:hover .cta-star {
		opacity: 1;
		transform: rotate(90deg);
	}

	.cta-button:hover .cta-content {
		transform: translateX(-8px);
	}

	/* Code Showcase - Optimatia style */
	.code-showcase {
		position: relative;
		max-width: 672px;
		margin: 0 auto;
		background: #15151F;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 24px;
		padding: 32px;
		box-shadow: 0 4px 50px rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
	}

	.code-glow {
		position: absolute;
		inset: -1px;
		background: linear-gradient(135deg, rgba(91, 80, 255, 0.2), rgba(244, 96, 74, 0.2));
		border-radius: 24px;
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: -1;
	}

	.code-showcase:hover .code-glow {
		opacity: 1;
	}

	.code-content {
		text-align: left;
		font-size: 0.875rem;
		overflow-x: auto;
		margin: 0;
	}

	.code-content code {
		color: rgba(255, 255, 255, 0.8);
		font-family: 'Fira Code', monospace;
	}

	/* ====================================
	   FEATURES SECTION
	   ==================================== */

	.features-section {
		padding: 128px 24px;
		background: #0B2641;
	}

	.section-container {
		max-width: 1280px;
		margin: 0 auto;
	}

	.section-header {
		text-align: center;
		margin-bottom: 80px;
	}

	.section-badge {
		display: block;
		color: rgba(255, 255, 255, 0.6);
		font-family: 'DM Mono', monospace;
		font-size: 0.875rem;
		letter-spacing: 0.05em;
		margin-bottom: 16px;
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 3rem);
		font-weight: 700;
		margin-bottom: 16px;
		color: #ffffff;
	}

	.section-subtitle {
		font-size: 1.25rem;
		color: rgba(255, 255, 255, 0.6);
	}

	/* Feature Cards - Optimatia enhanced */
	.features-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 32px;
	}

	@media (min-width: 768px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.feature-card {
		position: relative;
		background: #15151F;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 24px;
		padding: 32px;
		height: 100%;
		transition: all 0.35s ease;
		overflow: hidden;
	}

	.feature-card-glow {
		position: absolute;
		inset: -1px;
		background: linear-gradient(135deg, rgba(91, 80, 255, 0.3), transparent);
		border-radius: 24px;
		opacity: 0;
		transition: opacity 0.35s ease;
		z-index: 0;
	}

	.feature-card:hover {
		border-color: rgba(91, 80, 255, 0.5);
		box-shadow: 0 4px 50px rgba(91, 80, 255, 0.2);
		transform: translateY(-4px);
	}

	.feature-card:hover .feature-card-glow {
		opacity: 1;
	}

	.feature-icon {
		position: relative;
		font-size: 3rem;
		margin-bottom: 24px;
		transition: transform 0.35s ease;
		z-index: 1;
	}

	.feature-card:hover .feature-icon {
		transform: scale(1.1);
	}

	.feature-title {
		position: relative;
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 16px;
		color: #ffffff;
		z-index: 1;
	}

	.feature-description {
		position: relative;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.6;
		z-index: 1;
	}

	/* ====================================
	   SHOWCASE SECTION
	   ==================================== */

	.showcase-section {
		padding: 128px 24px;
		background: #0A1F35;
	}

	.showcase-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 32px;
	}

	@media (min-width: 768px) {
		.showcase-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.showcase-card {
		position: relative;
		height: 256px;
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 700;
		font-size: 2rem;
		transition: all 0.35s ease;
		overflow: hidden;
	}

	.showcase-glow {
		position: absolute;
		inset: 0;
		opacity: 0.3;
		transition: opacity 0.35s ease;
	}

	.showcase-card:hover {
		transform: scale(1.05);
	}

	.showcase-card:hover .showcase-glow {
		opacity: 0.5;
	}

	.showcase-fade {
		background: linear-gradient(135deg, #5B50FF 0%, #F4604A 100%);
		box-shadow: 0 4px 50px rgba(91, 80, 255, 0.3);
	}

	.showcase-fade:hover {
		box-shadow: 0 4px 50px rgba(91, 80, 255, 0.5);
	}

	.showcase-fade .showcase-glow {
		background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3), transparent);
	}

	.showcase-slide {
		background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
		box-shadow: 0 4px 50px rgba(16, 185, 129, 0.3);
	}

	.showcase-slide:hover {
		box-shadow: 0 4px 50px rgba(16, 185, 129, 0.5);
	}

	.showcase-slide .showcase-glow {
		background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3), transparent);
	}

	.showcase-scale {
		background: linear-gradient(135deg, #4ade80 0%, #84cc16 100%);
		box-shadow: 0 4px 50px rgba(74, 222, 128, 0.3);
		color: #000000;
	}

	.showcase-scale:hover {
		box-shadow: 0 4px 50px rgba(74, 222, 128, 0.5);
	}

	.showcase-scale .showcase-glow {
		background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3), transparent);
	}

	.showcase-cta {
		text-align: center;
		margin-top: 64px;
	}

	.showcase-link {
		display: inline-block;
		padding: 16px 32px;
		background: #15151F;
		color: #ffffff;
		font-weight: 600;
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 4px 50px rgba(0, 0, 0, 0.04);
		text-decoration: none;
		transition: all 0.35s ease;
	}

	.showcase-link:hover {
		background: #1F1F2E;
		border-color: rgba(91, 80, 255, 0.5);
		box-shadow: 0 4px 50px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	/* ====================================
	   FINAL CTA SECTION - FULL OPTIMATIA
	   ==================================== */

	.final-cta-section {
		padding: 128px 24px;
		background: #0B2641;
	}

	.cta-card {
		position: relative;
		background: #15151F;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 32px;
		padding: 64px;
		text-align: center;
		box-shadow: 0 4px 50px rgba(0, 0, 0, 0.3);
		overflow: hidden;
	}

	.cta-card-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(91, 80, 255, 0.1) 0%, transparent 50%, rgba(244, 96, 74, 0.1) 100%);
		pointer-events: none;
	}

	/* Optimatia decorative shapes */
	.cta-decorative-shapes {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.shape {
		position: absolute;
		opacity: 0.1;
		transition: opacity 0.3s ease;
	}

	.cta-card:hover .shape {
		opacity: 0.15;
	}

	.shape-1 {
		top: 20%;
		right: 10%;
		width: 100px;
		height: 100px;
		background: linear-gradient(135deg, #5B50FF, #F4604A);
		border-radius: 20px;
		transform: rotate(45deg);
		filter: blur(40px);
	}

	.shape-2 {
		bottom: 30%;
		left: 15%;
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #10b981, #14b8a6);
		border-radius: 50%;
		filter: blur(30px);
	}

	.shape-3 {
		top: 50%;
		left: 5%;
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, #4ade80, #84cc16);
		border-radius: 10px;
		transform: rotate(-30deg);
		filter: blur(25px);
	}

	.cta-card-content {
		position: relative;
		z-index: 10;
	}

	.cta-card-title {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 700;
		margin-bottom: 24px;
		color: #ffffff;
	}

	.cta-card-subtitle {
		font-size: 1.25rem;
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: 40px;
	}

	.install-command {
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		padding: 24px;
		max-width: 560px;
		margin: 0 auto 40px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.command-text {
		color: #5B50FF;
		font-size: 1.125rem;
		font-family: 'Fira Code', monospace;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.hero-section {
			padding: 100px 20px 60px;
			min-height: auto;
		}

		.cta-container {
			margin-bottom: 48px;
		}

		.code-showcase {
			padding: 24px;
		}

		.features-section,
		.showcase-section,
		.final-cta-section {
			padding: 80px 20px;
		}

		.cta-card {
			padding: 40px 24px;
		}

		.floating-icon {
			opacity: 0.05;
		}
	}

	@media (max-width: 480px) {
		.hero-section {
			padding: 80px 16px 40px;
		}

		.cta-button {
			width: 100%;
			justify-content: center;
		}
	}

	/* Optimatia-inspired smooth transitions */
	a, button {
		transition: transform 0.35s ease, opacity 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
	}
</style>