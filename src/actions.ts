import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { GSAPAnimateAction, GSAPAnimateOptions, GSAPDraggableAction, GSAPDraggableOptions } from './types';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Main GSAP animation action for Svelte
 * 
 * Provides automatic cleanup, TypeScript support, and ScrollTrigger integration
 * 
 * @example
 * ```svelte
 * <script>
 *   import { gsapAnimate } from '@gsap/svelte';
 * </script>
 * 
 * <div use:gsapAnimate={{
 *   type: 'from',
 *   opacity: 0,
 *   y: 50,
 *   duration: 1,
 *   ease: 'power2.out'
 * }}>
 *   Animated content
 * </div>
 * ```
 */
export const gsapAnimate: GSAPAnimateAction = (node, options = {}) => {
  let currentTween: gsap.core.Tween | null = null;
  
  /**
   * Create or update the animation
   */
  const createAnimation = (opts: GSAPAnimateOptions) => {
    // Cleanup previous animation
    if (currentTween) {
      currentTween.kill();
      currentTween = null;
    }
    
    // Don't create animation if disabled
    if (opts.disabled) {
      return;
    }
    
    // Extract options
    const {
      type = 'to',
      scrollTrigger,
      fromVars,
      disabled,
      ...tweenVars
    } = opts;
    
    // Prepare ScrollTrigger configuration
    const scrollTriggerConfig = scrollTrigger ? {
      ...scrollTrigger,
      trigger: scrollTrigger.trigger || node,
    } : undefined;
    
    // Create the appropriate animation type
    try {
      switch (type) {
        case 'from':
          currentTween = gsap.from(node, {
            ...tweenVars,
            scrollTrigger: scrollTriggerConfig,
          });
          break;
          
        case 'fromTo':
          if (!fromVars) {
            console.warn('[gsap-svelte] fromTo animation requires fromVars option');
            return;
          }
          currentTween = gsap.fromTo(node, fromVars, {
            ...tweenVars,
            scrollTrigger: scrollTriggerConfig,
          });
          break;
          
        case 'to':
        default:
          currentTween = gsap.to(node, {
            ...tweenVars,
            scrollTrigger: scrollTriggerConfig,
          });
          break;
      }
    } catch (error) {
      console.error('[gsap-svelte] Error creating animation:', error);
    }
  };
  
  // Create initial animation
  createAnimation(options);
  
  return {
    /**
     * Update the animation when options change
     */
    update(newOptions: GSAPAnimateOptions) {
      createAnimation(newOptions);
    },
    
    /**
     * Cleanup on element removal
     */
    destroy() {
      if (currentTween) {
        // Kill the tween
        currentTween.kill();
        
        // Kill associated ScrollTrigger if it exists
        if (currentTween.scrollTrigger) {
          currentTween.scrollTrigger.kill();
        }
        
        currentTween = null;
      }
    }
  };
};

/**
 * Convenience action for fade animations
 * 
 * @example
 * ```svelte
 * <div use:gsapFade={{ duration: 1, delay: 0.5 }}>
 *   Fades in on mount
 * </div>
 * ```
 */
export const gsapFade: GSAPAnimateAction = (node, options = {}) => {
  return gsapAnimate(node, {
    type: 'from',
    opacity: 0,
    ...options,
  });
};

/**
 * Convenience action for slide animations
 * 
 * @example
 * ```svelte
 * <div use:gsapSlide={{ direction: 'left', distance: 100 }}>
 *   Slides in from the left
 * </div>
 * ```
 */
export const gsapSlide: GSAPAnimateAction = (node, options = {}) => {
  const { direction = 'up', distance = 50, ...rest } = options as any;
  
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };
  
  return gsapAnimate(node, {
    type: 'from',
    ...directionMap[direction as keyof typeof directionMap],
    ...rest,
  });
};

/**
 * Convenience action for scale animations
 * 
 * @example
 * ```svelte
 * <div use:gsapScale={{ from: 0, duration: 0.5 }}>
 *   Scales up from 0
 * </div>
 * ```
 */
export const gsapScale: GSAPAnimateAction = (node, options = {}) => {
  const { from = 0, ...rest } = options as any;

  return gsapAnimate(node, {
    type: 'from',
    scale: from,
    ...rest,
  });
};

/**
 * Draggable action for making elements draggable with GSAP
 *
 * Supports inertia, bounds, snapping, and callbacks
 *
 * @example
 * ```svelte
 * <div use:gsapDraggable={{
 *   type: 'x,y',
 *   inertia: true,
 *   bounds: '.container',
 *   snap: { x: (value) => Math.round(value / 100) * 100 }
 * }}>
 *   Drag me!
 * </div>
 * ```
 */
// Local interface for Draggable instances to avoid GSAP type imports
interface DraggableInstance {
  kill(): void;
  enable(): void;
  disable(): void;
}

// Local interface for Draggable constructor
interface DraggableConstructor {
  create(target: HTMLElement, vars?: Record<string, unknown>): DraggableInstance[];
}

export const gsapDraggable: GSAPDraggableAction = (node, options = {}) => {
  let draggableInstance: DraggableInstance[] | null = null;

  /**
   * Create or update the draggable instance
   */
  const createDraggable = async (opts: GSAPDraggableOptions) => {
    // Cleanup previous instance
    if (draggableInstance) {
      draggableInstance.forEach(d => d.kill());
      draggableInstance = null;
    }

    // Don't create draggable if disabled
    if (opts.disabled) {
      return;
    }

    // Remove disabled from options before passing to Draggable.create
    const { disabled, ...draggableOpts } = opts;

    try {
      // Dynamically import Draggable and InertiaPlugin using dist path to avoid casing issues
      const DraggableModule = await import('gsap/dist/Draggable');
      const InertiaModule = await import('gsap/dist/InertiaPlugin');

      const Draggable = DraggableModule.Draggable as unknown as DraggableConstructor;
      const InertiaPlugin = InertiaModule.InertiaPlugin;

      // Register plugins
      gsap.registerPlugin(Draggable, InertiaPlugin);

      draggableInstance = Draggable.create(node, draggableOpts);
    } catch (error) {
      console.error('[gsap-svelte] Error creating draggable:', error);
    }
  };

  // Create initial draggable
  createDraggable(options);

  return {
    /**
     * Update draggable when options change
     */
    update(newOptions: GSAPDraggableOptions) {
      createDraggable(newOptions);
    },

    /**
     * Cleanup on element removal
     */
    destroy() {
      if (draggableInstance) {
        draggableInstance.forEach(d => d.kill());
        draggableInstance = null;
      }
    }
  };
};
