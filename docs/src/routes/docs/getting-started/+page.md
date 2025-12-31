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

@gsap/svelte provides clean, composable Svelte components for animations.

### Using Components

```svelte
<script>
  import { GsapAnimate } from '@gsap/svelte';
</script>

<GsapAnimate type="from" opacity={0} y={50} duration={1}>
  <div>This element animates on mount!</div>
</GsapAnimate>
```

## Animation Types

@gsap/svelte supports three animation types:

### 1. `to` - Animate TO values

```svelte
<GsapAnimate type="to" x={100} rotation={360} duration={2}>
  <div>Animates to these values</div>
</GsapAnimate>
```

### 2. `from` - Animate FROM values

```svelte
<GsapAnimate type="from" opacity={0} scale={0.5} duration={1}>
  <div>Animates from these values to current</div>
</GsapAnimate>
```

### 3. `fromTo` - Animate FROM and TO

```svelte
<GsapAnimate
  type="fromTo"
  fromVars={{ x: -100, opacity: 0 }}
  x={0}
  opacity={1}
  duration={1.5}
>
  <div>Animates from and to specific values</div>
</GsapAnimate>
```

## With ScrollTrigger

Add scroll-based animations easily:

```svelte
<script>
  import { GsapAnimate } from '@gsap/svelte';
</script>

<GsapAnimate
  type="from"
  opacity={0}
  y={100}
  duration={1}
  scrollTrigger={{
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }}
>
  <div>Animates when scrolled into view</div>
</GsapAnimate>
```

## Next Steps

- Explore available animation components
- Learn about [Timeline](/docs/timeline) utilities
- Check out [Examples](/docs/examples)
