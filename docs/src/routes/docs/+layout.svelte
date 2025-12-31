<script lang="ts">
  import { page } from '$app/stores';

  const navigation = [
    { title: '← Home', href: '/', icon: true },
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '/docs/getting-started' }
      ]
    },
    {
      title: 'Components',
      items: [
        { title: 'Overview', href: '/docs/actions' }
      ]
    },
    {
      title: 'Advanced',
      items: [
        { title: 'Timeline', href: '/docs/timeline' },
        { title: 'Examples', href: '/docs/examples' }
      ]
    }
  ];
</script>

<!-- Modern documentation layout -->
<div class="docs-layout min-h-screen bg-neutral-950">
  <div class="grid grid-cols-[280px_1fr] max-w-[1600px] mx-auto md:grid-cols-1">
    <!-- Sidebar -->
    <aside class="sidebar bg-neutral-900/50 border-r border-neutral-800/50 sticky top-0 h-screen overflow-y-auto backdrop-blur-sm md:relative md:h-auto">
      <div class="p-6 border-b border-neutral-800/50">
        <a href="/" class="no-underline group">
          <h1 class="text-2xl m-0 font-bold bg-gradient-to-r from-gsap-green to-green-400 bg-clip-text text-transparent">
            @gsap/svelte
          </h1>
          <p class="mt-2 text-neutral-400 text-sm">Documentation</p>
        </a>
      </div>

      <nav class="p-6">
        {#each navigation as section}
          {#if section.items}
            <div class="mb-8">
              <div class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 px-3">
                {section.title}
              </div>
              <div class="flex flex-col gap-1">
                {#each section.items as item}
                  <a
                    href={item.href}
                    class="text-neutral-300 no-underline px-4 py-2.5 rounded-lg text-sm transition-all duration-200 hover:bg-neutral-800/50 hover:text-white hover:translate-x-1 {$page.url.pathname === item.href ? 'bg-gsap-green !text-black font-semibold shadow-lg shadow-gsap-green/20' : ''}"
                  >
                    {item.title}
                  </a>
                {/each}
              </div>
            </div>
          {:else}
            <a
              href={section.href}
              class="flex items-center gap-2 text-neutral-400 no-underline px-4 py-2.5 rounded-lg text-sm mb-4 transition-all duration-200 hover:bg-neutral-800/50 hover:text-gsap-green"
            >
              {section.title}
            </a>
          {/if}
        {/each}

        <!-- GitHub Link -->
        <div class="mt-8 pt-8 border-t border-neutral-800/50">
          <a
            href="https://github.com/rchavezj/gsap-svelte"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-neutral-400 no-underline px-4 py-2.5 rounded-lg text-sm transition-all duration-200 hover:bg-neutral-800/50 hover:text-white"
          >
            <span>GitHub</span>
            <span class="text-xs">↗</span>
          </a>
        </div>
      </nav>
    </aside>

    <!-- Main content area -->
    <main class="docs-content">
      <div class="max-w-4xl mx-auto px-8 py-16 md:px-6">
        <!-- Breadcrumb -->
        <div class="text-sm text-neutral-500 mb-8">
          <a href="/" class="hover:text-gsap-green transition-colors no-underline">Home</a>
          <span class="mx-2">/</span>
          <span class="text-neutral-400">Docs</span>
        </div>

        <!-- Content -->
        <article class="prose prose-invert prose-neutral max-w-none">
          <slot />
        </article>

        <!-- Footer Navigation -->
        <div class="mt-16 pt-8 border-t border-neutral-800/50">
          <div class="flex justify-between items-center">
            <a
              href="https://github.com/rchavezj/gsap-svelte/issues"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-neutral-400 hover:text-gsap-green transition-colors no-underline"
            >
              Report an issue →
            </a>
            <a
              href="https://github.com/rchavezj/gsap-svelte"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-neutral-400 hover:text-gsap-green transition-colors no-underline"
            >
              Edit on GitHub →
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>

<style>
  .docs-layout {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  /* Prose styling for markdown content */
  :global(.prose) {
    @apply text-neutral-300;
  }

  :global(.prose h1) {
    @apply text-5xl font-bold mb-6 mt-0 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent;
  }

  :global(.prose h2) {
    @apply text-3xl font-bold mb-4 mt-12 text-white border-b border-neutral-800 pb-4;
  }

  :global(.prose h3) {
    @apply text-2xl font-semibold mb-3 mt-8 text-white;
  }

  :global(.prose p) {
    @apply mb-6 leading-relaxed text-neutral-300;
  }

  :global(.prose a) {
    @apply text-gsap-green hover:text-green-400 transition-colors no-underline border-b border-gsap-green/30 hover:border-gsap-green/60;
  }

  :global(.prose code) {
    @apply bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-sm text-gsap-green;
  }

  :global(.prose pre) {
    @apply bg-neutral-900 border border-neutral-800 rounded-xl p-6 overflow-x-auto my-6 shadow-2xl;
  }

  :global(.prose pre code) {
    @apply bg-transparent border-0 p-0 text-neutral-300;
  }

  :global(.prose ul) {
    @apply mb-6 space-y-2;
  }

  :global(.prose li) {
    @apply text-neutral-300;
  }

  :global(.prose strong) {
    @apply text-white font-semibold;
  }

  :global(.prose blockquote) {
    @apply border-l-4 border-gsap-green pl-6 italic text-neutral-400 my-6;
  }

  @media (max-width: 768px) {
    .sidebar {
      position: relative;
      height: auto;
    }
  }
</style>
