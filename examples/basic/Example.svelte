<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    gsapAnimate, 
    gsapFade, 
    gsapSlide, 
    gsapScale,
    createTimeline,
    batchAnimate 
  } from '@gsap/svelte';

  // Reactive state
  let isEnabled = true;
  let distance = 100;
  
  // Timeline elements
  let box1: HTMLDivElement;
  let box2: HTMLDivElement;
  let box3: HTMLDivElement;
  
  // Timeline example
  onMount(() => {
    const tl = createTimeline({
      defaults: { duration: 1, ease: 'power2.out' }
    });
    
    tl.from(box1, { x: -100, opacity: 0 })
      .from(box2, { x: 100, opacity: 0 }, '<0.2')
      .from(box3, { y: 50, opacity: 0 });
    
    // Batch animate grid items
    const gridAnimation = batchAnimate('.grid-item', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: {
        each: 0.1,
        from: 'start'
      }
    });
    
    return () => {
      tl.kill();
      gridAnimation.kill();
    };
  });
</script>

<div class="container">
  <h1>@gsap/svelte Examples</h1>
  
  <!-- Basic gsapAnimate action -->
  <section>
    <h2>gsapAnimate - Basic Animation</h2>
    <div 
      class="box"
      use:gsapAnimate={{
        type: 'from',
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
      }}
    >
      Basic Animation
    </div>
  </section>
  
  <!-- Convenience actions -->
  <section>
    <h2>Convenience Actions</h2>
    
    <div class="row">
      <div class="box" use:gsapFade={{ duration: 1 }}>
        gsapFade
      </div>
      
      <div class="box" use:gsapSlide={{ direction: 'left', distance: 100 }}>
        gsapSlide
      </div>
      
      <div class="box" use:gsapScale={{ from: 0, duration: 0.5 }}>
        gsapScale
      </div>
    </div>
  </section>
  
  <!-- Reactive animations -->
  <section>
    <h2>Reactive Animations</h2>
    
    <div class="controls">
      <label>
        <input type="checkbox" bind:checked={isEnabled} />
        Enable Animation
      </label>
      
      <label>
        Distance: {distance}px
        <input type="range" bind:value={distance} min="0" max="200" />
      </label>
    </div>
    
    <div 
      class="box"
      use:gsapAnimate={{
        type: 'from',
        x: distance,
        opacity: 0,
        duration: 1,
        disabled: !isEnabled
      }}
    >
      Reactive Animation
    </div>
  </section>
  
  <!-- Timeline animation -->
  <section>
    <h2>Timeline Animation</h2>
    
    <div class="row">
      <div class="box" bind:this={box1}>Box 1</div>
      <div class="box" bind:this={box2}>Box 2</div>
      <div class="box" bind:this={box3}>Box 3</div>
    </div>
  </section>
  
  <!-- ScrollTrigger -->
  <section>
    <h2>ScrollTrigger Animation</h2>
    
    <div 
      class="box scroll-box"
      use:gsapAnimate={{
        type: 'from',
        opacity: 0,
        scale: 0.5,
        duration: 1,
        scrollTrigger: {
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      }}
    >
      Scroll to see me animate!
    </div>
  </section>
  
  <!-- Batch animation with stagger -->
  <section>
    <h2>Batch Animation (Stagger)</h2>
    
    <div class="grid">
      {#each Array(9) as _, i}
        <div class="box grid-item">
          Item {i + 1}
        </div>
      {/each}
    </div>
  </section>
  
  <!-- FromTo animation -->
  <section>
    <h2>FromTo Animation</h2>
    
    <div 
      class="box"
      use:gsapAnimate={{
        type: 'fromTo',
        fromVars: { x: -100, opacity: 0, backgroundColor: '#ff6b6b' },
        x: 0,
        opacity: 1,
        backgroundColor: '#4ecdc4',
        duration: 2,
        ease: 'power2.inOut'
      }}
    >
      FromTo with Color
    </div>
  </section>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: system-ui, -apple-system, sans-serif;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 3rem;
  }
  
  h2 {
    color: #34495e;
    margin: 3rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #3498db;
  }
  
  section {
    margin-bottom: 4rem;
  }
  
  .box {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    font-weight: 600;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 1rem 0;
  }
  
  .row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .row .box {
    flex: 1;
    min-width: 200px;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .grid-item {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .scroll-box {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100vh;
  }
  
  .controls {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }
  
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  
  input[type="range"] {
    width: 200px;
    margin-left: 0.5rem;
  }
</style>
