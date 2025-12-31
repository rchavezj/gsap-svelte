import { gsap } from 'gsap';
import type { GSAPTimelineOptions } from './types';

/**
 * Create a GSAP timeline with Svelte lifecycle integration
 * 
 * @example
 * ```svelte
 * <script>
 *   import { onMount } from 'svelte';
 *   import { createTimeline } from '@gsap/svelte';
 * 
 *   let box1, box2, box3;
 *   
 *   onMount(() => {
 *     const tl = createTimeline({ defaults: { duration: 1 } });
 *     
 *     tl.from(box1, { x: -100, opacity: 0 })
 *       .from(box2, { x: 100, opacity: 0 })
 *       .from(box3, { y: 50, opacity: 0 });
 *     
 *     return () => tl.kill();
 *   });
 * </script>
 * ```
 */
export function createTimeline(options: GSAPTimelineOptions = {}) {
  const { scrollTrigger, ...timelineOptions } = options;
  
  const timeline = gsap.timeline({
    ...timelineOptions,
    scrollTrigger: scrollTrigger ? {
      ...scrollTrigger,
    } : undefined,
  });
  
  return timeline;
}

/**
 * Create a context-safe timeline that can be used in event handlers
 * 
 * @example
 * ```svelte
 * <script>
 *   import { createContextSafeTimeline } from '@gsap/svelte';
 * 
 *   const { timeline, contextSafe } = createContextSafeTimeline();
 *   
 *   const handleClick = contextSafe((event) => {
 *     timeline
 *       .to('.box', { x: 100 })
 *       .to('.box', { y: 100 });
 *   });
 * </script>
 * ```
 */
export function createContextSafeTimeline(options: GSAPTimelineOptions = {}) {
  const timeline = createTimeline(options);
  const ctx = gsap.context(() => {});
  
  const contextSafe = <T extends (...args: any[]) => any>(fn: T) => {
    return ((...args: Parameters<T>) => {
      return ctx.add(() => fn(...args));
    }) as T;
  };
  
  return {
    timeline,
    contextSafe,
    kill: () => {
      timeline.kill();
      ctx.revert();
    }
  };
}

/**
 * Batch animate multiple elements with stagger
 * 
 * @example
 * ```svelte
 * <script>
 *   import { onMount } from 'svelte';
 *   import { batchAnimate } from '@gsap/svelte';
 * 
 *   let container;
 *   
 *   onMount(() => {
 *     const animation = batchAnimate('.item', {
 *       opacity: 0,
 *       y: 50,
 *       stagger: 0.1,
 *       scrollTrigger: {
 *         trigger: container,
 *         start: 'top center'
 *       }
 *     });
 *     
 *     return () => animation.kill();
 *   });
 * </script>
 * ```
 */
export function batchAnimate(
  targets: gsap.TweenTarget,
  options: {
    scrollTrigger?: any;
    stagger?: any;
    [key: string]: any;
  } = {}
) {
  const { scrollTrigger, stagger, ...tweenVars } = options;
  
  const animation = gsap.from(targets, {
    ...tweenVars,
    stagger,
    scrollTrigger: scrollTrigger ? {
      ...scrollTrigger,
    } : undefined,
  });
  
  return animation;
}

/**
 * Create a matched animation set for complex sequences
 * 
 * @example
 * ```svelte
 * <script>
 *   import { createMatchMedia } from '@gsap/svelte';
 * 
 *   const mm = createMatchMedia();
 *   
 *   mm.add('(min-width: 768px)', () => {
 *     // Desktop animations
 *     gsap.from('.hero', { x: -100 });
 *   });
 *   
 *   mm.add('(max-width: 767px)', () => {
 *     // Mobile animations
 *     gsap.from('.hero', { y: -100 });
 *   });
 * </script>
 * ```
 */
export function createMatchMedia() {
  return gsap.matchMedia();
}

/**
 * Utility to create scroll-triggered animations
 * 
 * @example
 * ```svelte
 * <script>
 *   import { scrollTrigger } from '@gsap/svelte';
 * 
 *   scrollTrigger('.fade-in', {
 *     opacity: 0,
 *     y: 50,
 *     duration: 1
 *   });
 * </script>
 * ```
 */
export function scrollTrigger(
  targets: gsap.TweenTarget,
  vars: any,
  scrollTriggerConfig: any = {}
) {
  return gsap.from(targets, {
    ...vars,
    scrollTrigger: {
      trigger: targets,
      start: 'top 80%',
      ...scrollTriggerConfig,
    }
  });
}
