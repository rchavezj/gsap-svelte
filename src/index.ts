/**
 * @gsap/svelte
 * 
 * Official Svelte integration for GSAP animations
 * Provides automatic cleanup, TypeScript support, and ScrollTrigger integration
 * 
 * @author Roberto Chavez
 * @license MIT
 */

// Re-export GSAP for convenience
export { gsap } from 'gsap';
export { ScrollTrigger } from 'gsap/ScrollTrigger';
export { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Actions
export {
  gsapAnimate,
  gsapFade,
  gsapSlide,
  gsapScale,
  gsapDraggable,
} from './actions';

// Components
export {
  GsapAnimate,
  GsapFade,
  GsapSlide,
  GsapScale,
  GsapDraggable,
  GSAPContainer,
} from './components';

// Timeline utilities
export {
  createTimeline,
  createContextSafeTimeline,
  batchAnimate,
  createMatchMedia,
  scrollTrigger,
} from './timeline';

// Types
export type {
  AnimationType,
  GSAPAnimateOptions,
  GSAPAnimateAction,
  GSAPDraggableOptions,
  GSAPDraggableAction,
  GSAPContainerOptions,
  GSAPContext,
  UseGSAPContextOptions,
  GSAPTimelineOptions,
  GSAPBatchOptions,
  ContextSafeFunction,
} from './types';

// Version
export const version = '1.0.0';
