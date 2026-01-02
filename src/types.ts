import type { Action } from 'svelte/action';

// Use GSAP's global types directly (no imports needed - they're globally available)

/**
 * Animation type for GSAP tweens
 */
export type AnimationType = 'to' | 'from' | 'fromTo';

/**
 * HTML Element types supported
 */
export type ElementType = 'div' | 'span' | 'section' | 'article' | 
  'header' | 'footer' | 'main' | 'aside' | 'nav'
;


/**
 * Options for the gsapAnimate action
 */
export interface GSAPAnimateOptions extends Omit<GSAPTweenVars, 'scrollTrigger'> {
  /**
   * Type of animation to perform
   * - 'to': Animate to the specified values
   * - 'from': Animate from the specified values
   * - 'fromTo': Animate from and to specified values (requires fromVars)
   */
  type?: AnimationType;

  /**
   * ScrollTrigger configuration
   */
  scrollTrigger?: ScrollTrigger.Vars;

  /**
   * For 'fromTo' animations - the starting values
   */
  fromVars?: GSAPTweenVars;

  /**
   * Disable the animation (useful for conditional animations)
   */
  disabled?: boolean;
}

/**
 * Return type for context-safe wrapper
 */
export interface ContextSafeFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
}

/**
 * GSAP Context for Svelte components
 */
export interface GSAPContext {
  /**
   * The active GSAP tween
   */
  tween: GSAPTween | null;

  /**
   * Kill the current animation
   */
  kill: () => void;

  /**
   * Wrap a function to make it context-safe
   */
  contextSafe: <T extends (...args: any[]) => any>(fn: T) => ContextSafeFunction<T>;
}

/**
 * Options for useGSAPContext
 */
export interface UseGSAPContextOptions {
  /**
   * Scope element for GSAP context
   */
  scope?: HTMLElement | null;
  
  /**
   * Dependencies array - when these change, the context recreates
   */
  dependencies?: any[];
}

/**
 * The main GSAP action type
 */
export type GSAPAnimateAction = Action<HTMLElement, GSAPAnimateOptions>;

/**
 * Timeline options for creating GSAP timelines
 */
export interface GSAPTimelineOptions {
  /**
   * Default properties for all tweens in the timeline
   */
  defaults?: GSAPTweenVars;

  /**
   * ScrollTrigger configuration for the timeline
   */
  scrollTrigger?: ScrollTrigger.Vars;

  /**
   * Pause the timeline immediately after creation
   */
  paused?: boolean;

  /**
   * Repeat the timeline (-1 for infinite)
   */
  repeat?: number;

  /**
   * Delay before repeating
   */
  repeatDelay?: number;

  /**
   * Yoyo effect on repeat
   */
  yoyo?: boolean;
}

/**
 * Options for batch animations
 */
export interface GSAPBatchOptions extends GSAPAnimateOptions {
  /**
   * Stagger configuration
   */
  stagger?: number | {
    each?: number;
    from?: 'start' | 'center' | 'edges' | 'random' | 'end' | number;
    grid?: [number, number];
    axis?: 'x' | 'y';
    ease?: string;
    amount?: number;
  };
}

/**
 * Options for the gsapDraggable action
 */
export interface GSAPDraggableOptions {
  /**
   * Type of dragging ('x', 'y', 'x,y', or 'rotation')
   */
  type?: string;

  /**
   * Enable inertia for momentum-based dragging
   */
  inertia?: boolean;

  /**
   * Bounds to constrain dragging
   */
  bounds?: any;

  /**
   * Snap configuration
   */
  snap?: any;

  /**
   * Callback when drag starts
   */
  onDragStart?: () => void;

  /**
   * Callback during drag
   */
  onDrag?: () => void;

  /**
   * Callback when drag ends
   */
  onDragEnd?: () => void;

  /**
   * Disable the draggable
   */
  disabled?: boolean;

  /**
   * Additional GSAP Draggable options
   */
  [key: string]: any;
}

/**
 * The GSAP draggable action type
 */
export type GSAPDraggableAction = Action<HTMLElement, GSAPDraggableOptions>;
