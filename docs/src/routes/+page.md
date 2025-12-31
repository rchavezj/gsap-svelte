# @gsap/svelte

Official Svelte integration for [GSAP](https://gsap.com) (GreenSock Animation Platform) with automatic cleanup, full TypeScript support, and seamless ScrollTrigger integration.

## Features

✨ **Svelte Actions** - Idiomatic Svelte integration using actions  
🧹 **Automatic Cleanup** - No memory leaks, animations cleaned up on component unmount  
📘 **TypeScript First** - Full type definitions included  
🎯 **ScrollTrigger Ready** - Built-in ScrollTrigger support  
⚡ **Performance** - Leverages GSAP's industry-leading animation performance  
🎨 **Convenience Actions** - Pre-built actions for common animations  
🔄 **SSR Safe** - Works with SvelteKit out of the box

## Quick Example

```svelte
<script>
  import { gsapAnimate } from '@gsap/svelte';
</script>

<div use:gsapAnimate={{
  type: 'from',
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power2.out'
}}>
  I fade and slide in!
</div>
```

## Installation

```bash
bun add @gsap/svelte gsap
```

```bash
npm install @gsap/svelte gsap
```

```bash
pnpm add @gsap/svelte gsap
```

## Get Started

Head over to the [Getting Started](/docs/getting-started) guide to begin using @gsap/svelte in your project.

## Community

- [GitHub](https://github.com/rchavezj/gsap-svelte)
- [GSAP Forums](https://gsap.com/community/)

---

<div class="hero-demo">
  <p>Interactive demo coming soon!</p>
</div>

<style>
  .hero-demo {
    margin: 3rem 0;
    padding: 3rem;
    background: #111;
    border-radius: 12px;
    text-align: center;
    color: #888;
  }
</style>
