# @gsap/svelte

Unofficial Svelte integration for [GSAP](https://gsap.com) (GreenSock Animation Platform) with automatic cleanup, full TypeScript support, and seamless ScrollTrigger integration.

## Features

✨ **Svelte Actions** - Idiomatic Svelte integration using actions  
🧹 **Automatic Cleanup** - No memory leaks, animations cleaned up on component unmount  
📘 **TypeScript First** - Full type definitions included  
🎯 **ScrollTrigger Ready** - Built-in ScrollTrigger support  
⚡ **Performance** - Leverages GSAP's industry-leading animation performance  
🎨 **Convenience Actions** - Pre-built actions for common animations  
🔄 **SSR Safe** - Works with SvelteKit out of the box

## Installation

```bash
bun add -D @gsap/svelte gsap
```

```bash
npm install @gsap/svelte gsap
```

```bash
pnpm add @gsap/svelte gsap
```

```bash
yarn add @gsap/svelte gsap
```

## Quick Start

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

## Core Actions

### `gsapAnimate`

The main animation action with full GSAP capabilities:

```svelte
<script>
  import { gsapAnimate } from '@gsap/svelte';
</script>

<!-- Animate TO values -->
<div use:gsapAnimate={{
  type: 'to',
  x: 100,
  rotation: 360,
  duration: 2
}}>
  To Animation
</div>

<!-- Animate FROM values -->
<div use:gsapAnimate={{
  type: 'from',
  opacity: 0,
  scale: 0.5,
  duration: 1
}}>
  From Animation
</div>

<!-- Animate FROM and TO -->
<div use:gsapAnimate={{
  type: 'fromTo',
  fromVars: { x: -100, opacity: 0 },
  x: 0,
  opacity: 1,
  duration: 1.5
}}>
  FromTo Animation
</div>
```

### `gsapFade`

Convenience action for fade animations:

```svelte
<script>
  import { gsapFade } from '@gsap/svelte';
</script>

<div use:gsapFade={{ duration: 1, delay: 0.5 }}>
  Fades in on mount
</div>
```

### `gsapSlide`

Convenience action for slide animations:

```svelte
<script>
  import { gsapSlide } from '@gsap/svelte';
</script>

<!-- Slide from different directions -->
<div use:gsapSlide={{ direction: 'left', distance: 100 }}>
  Slides from left
</div>

<div use:gsapSlide={{ direction: 'up', distance: 50, duration: 1 }}>
  Slides from top
</div>
```

Available directions: `'up'`, `'down'`, `'left'`, `'right'`

### `gsapScale`

Convenience action for scale animations:

```svelte
<script>
  import { gsapScale } from '@gsap/svelte';
</script>

<div use:gsapScale={{ from: 0, duration: 0.5 }}>
  Scales up from 0
</div>
```

## ScrollTrigger Integration

ScrollTrigger works seamlessly with all actions:

```svelte
<script>
  import { gsapAnimate } from '@gsap/svelte';
</script>

<div use:gsapAnimate={{
  type: 'from',
  opacity: 0,
  y: 100,
  duration: 1,
  scrollTrigger: {
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play none none reverse',
    markers: true // Remove in production
  }
}}>
  Animates on scroll
</div>
```

## Timeline Utilities

### `createTimeline`

Create complex animation sequences:

```svelte
<script>
  import { onMount } from 'svelte';
  import { createTimeline } from '@gsap/svelte';
  
  let box1, box2, box3;
  
  onMount(() => {
    const tl = createTimeline({
      defaults: { duration: 1, ease: 'power2.out' }
    });
    
    tl.from(box1, { x: -100, opacity: 0 })
      .from(box2, { x: 100, opacity: 0 }, '<0.2') // Overlap by 0.2s
      .from(box3, { y: 50, opacity: 0 });
    
    return () => tl.kill();
  });
</script>

<div bind:this={box1}>Box 1</div>
<div bind:this={box2}>Box 2</div>
<div bind:this={box3}>Box 3</div>
```

### `batchAnimate`

Animate multiple elements with stagger:

```svelte
<script>
  import { onMount } from 'svelte';
  import { batchAnimate } from '@gsap/svelte';
  
  let container;
  
  onMount(() => {
    const animation = batchAnimate('.item', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: {
        each: 0.1,
        from: 'start'
      },
      scrollTrigger: {
        trigger: container,
        start: 'top center'
      }
    });
    
    return () => animation.kill();
  });
</script>

<div bind:this={container} class="grid">
  {#each items as item}
    <div class="item">{item}</div>
  {/each}
</div>
```

### `createMatchMedia`

Responsive animations:

```svelte
<script>
  import { onMount } from 'svelte';
  import { createMatchMedia, gsap } from '@gsap/svelte';
  
  onMount(() => {
    const mm = createMatchMedia();
    
    mm.add('(min-width: 768px)', () => {
      // Desktop animations
      gsap.from('.hero', { x: -100, duration: 1 });
    });
    
    mm.add('(max-width: 767px)', () => {
      // Mobile animations
      gsap.from('.hero', { y: -100, duration: 1 });
    });
    
    return () => mm.revert();
  });
</script>
```

## Dynamic Animations

Actions can be updated reactively:

```svelte
<script>
  import { gsapAnimate } from '@gsap/svelte';
  
  let distance = 100;
  let animationEnabled = true;
</script>

<input type="range" bind:value={distance} min="0" max="200" />
<label>
  <input type="checkbox" bind:checked={animationEnabled} />
  Enable Animation
</label>

<div use:gsapAnimate={{
  type: 'from',
  x: distance,
  disabled: !animationEnabled
}}>
  Interactive Animation
</div>
```

## SvelteKit & SSR

The package is safe to use in SvelteKit with SSR:

```svelte
<script>
  import { browser } from '$app/environment';
  import { gsapAnimate } from '@gsap/svelte';
  
  // Only animate in browser
  $: animationConfig = browser ? {
    type: 'from',
    opacity: 0,
    y: 50
  } : { disabled: true };
</script>

<div use:gsapAnimate={animationConfig}>
  SSR-safe animation
</div>
```

## Advanced Examples

### Scroll-Linked Progress

```svelte
<script>
  import { onMount } from 'svelte';
  import { gsap, ScrollTrigger } from '@gsap/svelte';
  
  let progressBar;
  
  onMount(() => {
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  });
</script>

<div bind:this={progressBar} class="progress-bar" style="transform: scaleX(0)"></div>
```

### Complex Event Handlers

```svelte
<script>
  import { onMount } from 'svelte';
  import { createContextSafeTimeline } from '@gsap/svelte';
  
  let button;
  const { timeline, contextSafe, kill } = createContextSafeTimeline();
  
  const handleClick = contextSafe(() => {
    timeline
      .to(button, { scale: 1.2, duration: 0.2 })
      .to(button, { scale: 1, duration: 0.2 });
  });
  
  onMount(() => {
    return () => kill();
  });
</script>

<button bind:this={button} on:click={handleClick}>
  Click me!
</button>
```

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import type { GSAPAnimateOptions } from '@gsap/svelte';

const config: GSAPAnimateOptions = {
  type: 'from',
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.element',
    start: 'top center'
  }
};
```

## Plugin Support

All GSAP plugins work seamlessly:

```svelte
<script>
  import { gsap } from '@gsap/svelte';
  import { Draggable } from 'gsap/Draggable';
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
  
  gsap.registerPlugin(Draggable, MotionPathPlugin);
  
  // Use plugins as normal
</script>
```

## API Reference

### Actions

- `gsapAnimate(node, options)` - Main animation action
- `gsapFade(node, options)` - Fade animation
- `gsapSlide(node, options)` - Slide animation  
- `gsapScale(node, options)` - Scale animation

### Timeline Utilities

- `createTimeline(options)` - Create animation timeline
- `createContextSafeTimeline(options)` - Timeline with context safety
- `batchAnimate(targets, options)` - Batch animate with stagger
- `createMatchMedia()` - Responsive animations
- `scrollTrigger(targets, vars, config)` - Scroll-triggered animation

### Types

See [types.ts](./src/types.ts) for all TypeScript definitions.

## Examples

Check out the `/examples` directory for:
- Basic animations
- ScrollTrigger demos
- Timeline sequences
- SvelteKit integration
- Complex interactive examples

## Contributing

Contributions are welcome! Please read our contributing guidelines.

## License

MIT © Roberto Hernandez

GSAP is licensed by GreenSock. See [GSAP licensing](https://gsap.com/licensing/).

## Credits

Built with ❤️ for the Svelte community.  
Powered by [GSAP](https://gsap.com) by GreenSock.

## Support

- [GSAP Forums](https://gsap.com/community/)
- [GitHub Issues](https://github.com/yourusername/gsap-svelte/issues)
- [Documentation](https://github.com/yourusername/gsap-svelte#readme)
