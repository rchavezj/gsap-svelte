# Actions

@gsap/svelte provides Svelte actions for easy, declarative animations with automatic cleanup.

## gsapAnimate

The main animation action with full GSAP capabilities.

### Basic Usage

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
  Animated element
</div>
```

### Options

- `type`: Animation type (`'to'`, `'from'`, or `'fromTo'`)
- All GSAP TweenVars properties (x, y, opacity, rotation, scale, etc.)
- `scrollTrigger`: ScrollTrigger configuration object
- `fromVars`: Starting values for `'fromTo'` animations
- `disabled`: Conditionally disable the animation

## gsapFade

Convenience action for fade animations.

```svelte
<script>
  import { gsapFade } from '@gsap/svelte';
</script>

<div use:gsapFade={{ duration: 1, delay: 0.5 }}>
  Fades in on mount
</div>
```

## gsapSlide

Slide animations from different directions.

```svelte
<script>
  import { gsapSlide } from '@gsap/svelte';
</script>

<!-- Slide from left -->
<div use:gsapSlide={{ direction: 'left', distance: 100 }}>
  Slides from left
</div>

<!-- Slide from top -->
<div use:gsapSlide={{ direction: 'up', distance: 50, duration: 1 }}>
  Slides from top
</div>
```

Available directions: `'up'`, `'down'`, `'left'`, `'right'`

## gsapScale

Scale animations.

```svelte
<script>
  import { gsapScale } from '@gsap/svelte';
</script>

<div use:gsapScale={{ from: 0, duration: 0.5 }}>
  Scales up from 0
</div>
```

## Dynamic Updates

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

## With ScrollTrigger

All actions support ScrollTrigger:

```svelte
<div use:gsapAnimate={{
  type: 'from',
  opacity: 0,
  y: 100,
  scrollTrigger: {
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play none none reverse',
    markers: true  // Remove in production
  }
}}>
  Animates on scroll
</div>
```
