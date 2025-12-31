<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	const navigation = [
		{ title: 'Home', href: '/' },
		{ title: 'Getting Started', href: '/docs/getting-started' },
		{ title: 'Actions', href: '/docs/actions' },
		{ title: 'Timeline', href: '/docs/timeline' },
		{ title: 'Examples', href: '/docs/examples' }
	];
</script>

<div class="grid grid-cols-[250px_1fr] min-h-screen md:grid-cols-1">
	<aside class="bg-neutral-900 border-r border-neutral-800 p-8 px-6 sticky top-0 h-screen overflow-y-auto md:relative md:h-auto">
		<div class="mb-8">
			<h1 class="text-2xl m-0 text-gsap-green">@gsap/svelte</h1>
			<p class="mt-2 text-neutral-500 text-sm">GSAP animations for Svelte</p>
		</div>

		<nav class="flex flex-col gap-2">
			{#each navigation as item}
				<a
					href={item.href}
					class="text-neutral-400 no-underline px-4 py-2 rounded-md transition-all duration-200 hover:bg-neutral-800 hover:text-white {$page.url.pathname === item.href ? 'bg-gsap-green !text-black font-medium' : ''}"
				>
					{item.title}
				</a>
			{/each}
		</nav>
	</aside>

	<main class="p-12 max-w-4xl">
		<slot />
	</main>
</div>
