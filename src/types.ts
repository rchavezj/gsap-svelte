import type { Action } from 'svelte/action';
import type { GSAPTweenVars, GSAPTween } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

/**
 * Animation type for GSAP tweens
 */
export type AnimationType = 'to' | 'from' | 'fromTo';

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
  scrollTrigger?: ScrollTriggerType.Vars;
  
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
  scrollTrigger?: ScrollTriggerType.Vars;
  
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
