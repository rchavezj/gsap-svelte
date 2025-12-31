# Components

@gsap/svelte provides clean, composable Svelte components for easy animations with automatic cleanup.

## GsapAnimate

The main animation component with full GSAP capabilities.

### Basic Usage

```svelte
<script>
  import { GsapAnimate } from '@gsap/svelte';
</script>

<GsapAnimate type="from" opacity={0} y={50} duration={1} ease="power2.out">
  <div>Animated element</div>
</GsapAnimate>
```

### Options

- `type`: Animation type (`'to'`, `'from'`, or `'fromTo'`)
- All GSAP TweenVars properties (x, y, opacity, rotation, scale, etc.)
- `scrollTrigger`: ScrollTrigger configuration object
- `fromVars`: Starting values for `'fromTo'` animations
- `disabled`: Conditionally disable the animation

## GsapFade

Convenience component for fade animations.

```svelte
<script>
  import { GsapFade } from '@gsap/svelte';
</script>

<GsapFade duration={1} delay={0.5}>
  <div>Fades in on mount</div>
</GsapFade>
```

## GsapSlide

Slide animations from different directions.

```svelte
<script>
  import { GsapSlide } from '@gsap/svelte';
</script>

<!-- Slide from left -->
<GsapSlide direction="left" distance={100}>
  <div>Slides from left</div>
</GsapSlide>

<!-- Slide from top -->
<GsapSlide direction="up" distance={50} duration={1}>
  <div>Slides from top</div>
</GsapSlide>
```

Available directions: `'up'`, `'down'`, `'left'`, `'right'`

## GsapScale

Scale animations.

```svelte
<script>
  import { GsapScale } from '@gsap/svelte';
</script>

<GsapScale from={0} duration={0.5}>
  <div>Scales up from 0</div>
</GsapScale>
```

## Dynamic Updates

Components can be updated reactively:

```svelte
<script>
  import { GsapAnimate } from '@gsap/svelte';

  let distance = 100;
  let animationEnabled = true;
</script>

<input type="range" bind:value={distance} min="0" max="200" />
<label>
  <input type="checkbox" bind:checked={animationEnabled} />
  Enable Animation
</label>

<GsapAnimate type="from" x={distance} disabled={!animationEnabled}>
  <div>Interactive Animation</div>
</GsapAnimate>
```

## With ScrollTrigger

All components support ScrollTrigger:

```svelte
<GsapAnimate
  type="from"
  opacity={0}
  y={100}
  scrollTrigger={{
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play none none reverse',
    markers: true  // Remove in production
  }}
>
  <div>Animates on scroll</div>
</GsapAnimate>
```
