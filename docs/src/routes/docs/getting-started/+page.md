# Getting Started

Get up and running with @gsap/svelte in minutes.

## Installation

Install the library along with GSAP:

```bash
bun add @gsap/svelte gsap
```

Or with npm:

```bash
npm install @gsap/svelte gsap
```

## Basic Usage

The simplest way to use @gsap/svelte is with the `gsapAnimate` action:

```svelte
<script>
  import { gsapAnimate } from '@gsap/svelte';
</script>

<div use:gsapAnimate={{
  type: 'from',
  opacity: 0,
  y: 50,
  duration: 1
}}>
  This element animates on mount!
</div>
```

## Animation Types

@gsap/svelte supports three animation types:

### 1. `to` - Animate TO values

```svelte
<div use:gsapAnimate={{
  type: 'to',
  x: 100,
  rotation: 360,
  duration: 2
}}>
  Animates to these values
</div>
```

### 2. `from` - Animate FROM values

```svelte
<div use:gsapAnimate={{
  type: 'from',
  opacity: 0,
  scale: 0.5,
  duration: 1
}}>
  Animates from these values to current
</div>
```

### 3. `fromTo` - Animate FROM and TO

```svelte
<div use:gsapAnimate={{
  type: 'fromTo',
  fromVars: { x: -100, opacity: 0 },
  x: 0,
  opacity: 1,
  duration: 1.5
}}>
  Animates from and to specific values
</div>
```

## With ScrollTrigger

Add scroll-based animations easily:

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
    toggleActions: 'play none none reverse'
  }
}}>
  Animates when scrolled into view
</div>
```

## Next Steps

- Learn about all available [Actions](/docs/actions)
- Explore [Timeline](/docs/timeline) utilities
- Check out [Examples](/docs/examples)
