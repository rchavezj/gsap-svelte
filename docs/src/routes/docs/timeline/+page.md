# Timeline Utilities

Create complex animation sequences with GSAP timelines in Svelte.

## createTimeline

Create coordinated animation sequences:

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
      .from(box2, { x: 100, opacity: 0 }, '<0.2')
      .from(box3, { y: 50, opacity: 0 });
    
    return () => tl.kill();
  });
</script>

<div bind:this={box1}>Box 1</div>
<div bind:this={box2}>Box 2</div>
<div bind:this={box3}>Box 3</div>
```

## batchAnimate

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

## createMatchMedia

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

## Timeline with ScrollTrigger

```svelte
<script>
  import { onMount } from 'svelte';
  import { createTimeline } from '@gsap/svelte';
  
  let section;
  
  onMount(() => {
    const tl = createTimeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    });
    
    tl.from('.title', { opacity: 0, y: 50 })
      .from('.content', { opacity: 0, y: 30 }, '<0.2');
    
    return () => tl.kill();
  });
</script>

<section bind:this={section}>
  <h2 class="title">Title</h2>
  <p class="content">Content</p>
</section>
```
