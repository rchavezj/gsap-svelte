# @gsap/svelte - Implementation Roadmap

## Quick Start Guide

This document provides concrete implementation examples for expanding @gsap/svelte to achieve full GSAP feature parity.

---

## Phase 1: Quick Wins (Week 1-2)

### 1.1 Expose gsap.utils

**File:** `/src/index.ts`

```typescript
// Add to existing exports
export { gsap } from 'gsap';
export { ScrollTrigger } from 'gsap/ScrollTrigger';
export { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// NEW: Expose utils
export const utils = gsap.utils;

// Or with more explicit typing:
import type { Utils } from 'gsap';
export const utils: Utils = gsap.utils;
```

**Usage:**
```svelte
<script>
  import { utils } from '@gsap/svelte';

  const clampedValue = utils.clamp(0, 100, 150); // 100
  const randomValue = utils.random(0, 100); // Random between 0-100
  const mapped = utils.mapRange(0, 1, 0, 100, 0.5); // 50
</script>
```

---

### 1.2 Add gsapSet Action

**File:** `/src/actions.ts`

```typescript
/**
 * Instantly set properties without animation
 *
 * @example
 * ```svelte
 * <div use:gsapSet={{ opacity: 0, x: 100 }}>
 *   Instantly positioned
 * </div>
 * ```
 */
export const gsapSet: Action<HTMLElement, GSAPTweenVars> = (node, vars = {}) => {
  const setValue = (newVars: GSAPTweenVars) => {
    if (newVars.disabled) return;

    try {
      gsap.set(node, newVars);
    } catch (error) {
      console.error('[gsap-svelte] gsapSet error:', error);
    }
  };

  setValue(vars);

  return {
    update(newVars: GSAPTweenVars) {
      setValue(newVars);
    },
    destroy() {
      // gsap.set doesn't create persistent tweens, so no cleanup needed
    }
  };
};
```

**Component:** `/src/components/GsapSet.svelte`

```svelte
<script lang="ts">
  import { gsapSet } from '../actions';
  import type { ElementType } from '../types';

  export let element: ElementType = 'div';

  let className: string = '';
  export { className as class };

  const browser = typeof window !== 'undefined';
  const setProps = browser ? $$restProps : { disabled: true };
</script>

<svelte:element this={element} use:gsapSet={setProps} class={className}>
  <slot />
</svelte:element>
```

---

### 1.3 Add gsapQuickTo Action

**File:** `/src/actions.ts`

```typescript
export interface QuickToOptions {
  property: string;
  duration?: number;
  ease?: string | gsap.EaseFunction;
  disabled?: boolean;
}

/**
 * Performance-optimized property setter
 * Returns a function you can call repeatedly with new values
 *
 * @example
 * ```svelte
 * <script>
 *   let quickToX;
 *
 *   function handleMouseMove(e) {
 *     if (quickToX) quickToX(e.clientX);
 *   }
 * </script>
 *
 * <div use:gsapQuickTo={{
 *   property: 'x',
 *   duration: 0.3,
 *   bind: (fn) => quickToX = fn
 * }}>
 *   Follows cursor
 * </div>
 * ```
 */
export const gsapQuickTo: Action<HTMLElement, QuickToOptions & {
  bind?: (fn: (value: any) => void) => void
}> = (node, options = { property: 'x' }) => {
  let quickToFn: ((value: any) => void) | null = null;

  const create = (opts: QuickToOptions & { bind?: (fn: any) => void }) => {
    if (opts.disabled) return;

    const { property, duration = 0.3, ease = 'power2.out', bind } = opts;

    try {
      quickToFn = gsap.quickTo(node, property, { duration, ease });

      // Optionally bind the function to parent scope
      if (bind && quickToFn) {
        bind(quickToFn);
      }
    } catch (error) {
      console.error('[gsap-svelte] gsapQuickTo error:', error);
    }
  };

  create(options);

  return {
    update(newOptions) {
      create(newOptions);
    },
    destroy() {
      quickToFn = null;
    }
  };
};
```

---

### 1.4 Add Utility Functions

**File:** `/src/utilities.ts` (NEW FILE)

```typescript
import { gsap } from 'gsap';

/**
 * Delayed function call
 */
export function gsapDelayedCall(
  delay: number,
  callback: () => void,
  params?: any[]
) {
  return gsap.delayedCall(delay, callback, params);
}

/**
 * Kill all tweens of a target
 */
export function killTweensOf(
  target: gsap.TweenTarget,
  properties?: string | object
) {
  return gsap.killTweensOf(target, properties);
}

/**
 * Get all tweens of a target
 */
export function getTweensOf(
  target: gsap.TweenTarget,
  onlyActive?: boolean
) {
  return gsap.getTweensOf(target, onlyActive);
}

/**
 * Check if target is tweening
 */
export function isTweening(target: gsap.TweenTarget): boolean {
  return gsap.isTweening(target);
}

/**
 * Get computed property value
 */
export function getProperty(
  target: Element | string,
  property: string,
  unit?: string
) {
  return gsap.getProperty(target, property, unit);
}

/**
 * Configure global GSAP settings
 */
export function configureGSAP(config: {
  autoSleep?: number;
  force3D?: boolean | string;
  nullTargetWarn?: boolean;
  units?: { [key: string]: string };
}) {
  return gsap.config(config);
}

/**
 * Set default animation properties
 */
export function setDefaults(vars: GSAPTweenVars) {
  return gsap.defaults(vars);
}
```

**Update:** `/src/index.ts`

```typescript
// Add utility exports
export {
  gsapDelayedCall,
  killTweensOf,
  getTweensOf,
  isTweening,
  getProperty,
  configureGSAP,
  setDefaults,
} from './utilities';
```

---

## Phase 2: SplitText Integration (Week 3-4)

### 2.1 SplitText Action

**File:** `/src/actions/splitText.ts` (NEW FILE)

```typescript
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import type { Action } from 'svelte/action';

gsap.registerPlugin(SplitText);

export interface SplitTextOptions {
  /**
   * What to split: "chars", "words", "lines", or combinations like "chars,words"
   */
  type?: string;

  /**
   * Animation to apply to split elements
   */
  animation?: GSAPTweenVars;

  /**
   * Stagger configuration
   */
  stagger?: number | {
    each?: number;
    from?: string | number;
    ease?: string;
  };

  /**
   * Position where text appears (for wrapping)
   */
  position?: string;

  /**
   * Words/chars to leave together
   */
  wordsClass?: string;
  charsClass?: string;
  linesClass?: string;

  /**
   * Disable split
   */
  disabled?: boolean;

  /**
   * Callback when split is created
   */
  onSplit?: (split: SplitText) => void;
}

export const gsapSplitText: Action<HTMLElement, SplitTextOptions> = (
  node,
  options = {}
) => {
  let split: SplitText | null = null;
  let animation: gsap.core.Tween | null = null;

  const createSplit = (opts: SplitTextOptions) => {
    // Cleanup previous
    if (animation) {
      animation.kill();
      animation = null;
    }
    if (split) {
      split.revert();
      split = null;
    }

    if (opts.disabled) return;

    try {
      const {
        type = 'chars,words',
        animation: animVars,
        stagger,
        wordsClass,
        charsClass,
        linesClass,
        position,
        onSplit,
      } = opts;

      // Create SplitText instance
      split = new SplitText(node, {
        type,
        wordsClass,
        charsClass,
        linesClass,
        position,
      });

      // Callback with split instance
      if (onSplit) {
        onSplit(split);
      }

      // Apply animation if provided
      if (animVars) {
        const targets =
          type.includes('chars') ? split.chars :
          type.includes('words') ? split.words :
          split.lines;

        animation = gsap.from(targets, {
          ...animVars,
          stagger,
        });
      }
    } catch (error) {
      console.error('[gsap-svelte] SplitText error:', error);
    }
  };

  createSplit(options);

  return {
    update(newOptions: SplitTextOptions) {
      createSplit(newOptions);
    },

    destroy() {
      if (animation) {
        animation.kill();
        animation = null;
      }
      if (split) {
        split.revert();
        split = null;
      }
    }
  };
};
```

### 2.2 SplitText Component

**File:** `/src/components/GsapSplitText.svelte`

```svelte
<script lang="ts">
  import { gsapSplitText } from '../actions/splitText';
  import type { ElementType } from '../types';
  import type { SplitTextOptions } from '../actions/splitText';

  export let element: ElementType = 'div';
  export let type: string = 'chars,words';
  export let animation: any = undefined;
  export let stagger: any = undefined;
  export let wordsClass: string = '';
  export let charsClass: string = '';
  export let linesClass: string = '';
  export let disabled: boolean = false;

  let className: string = '';
  export { className as class };

  const browser = typeof window !== 'undefined';

  $: splitProps = browser ? {
    type,
    animation,
    stagger,
    wordsClass,
    charsClass,
    linesClass,
    disabled,
  } : { disabled: true };
</script>

<svelte:element
  this={element}
  use:gsapSplitText={splitProps}
  class={className}
>
  <slot />
</svelte:element>
```

### 2.3 SplitText Usage Examples

```svelte
<script>
  import { GsapSplitText } from '@gsap/svelte';
</script>

<!-- Basic character animation -->
<GsapSplitText
  type="chars"
  animation={{ opacity: 0, y: 20 }}
  stagger={0.05}
>
  Animate each character
</GsapSplitText>

<!-- Words with custom stagger -->
<GsapSplitText
  type="words"
  animation={{ opacity: 0, x: -20 }}
  stagger={{ each: 0.1, from: "start" }}
>
  Animate each word
</GsapSplitText>

<!-- Complex animation with callback -->
<GsapSplitText
  type="chars,words,lines"
  charsClass="char"
  wordsClass="word"
  linesClass="line"
  animation={{
    opacity: 0,
    y: 50,
    rotationX: -90,
  }}
  stagger={{
    each: 0.03,
    from: "center",
    ease: "power2.out"
  }}
>
  Complex split text animation!
</GsapSplitText>
```

---

## Phase 3: Draggable Integration (Week 5)

### 3.1 Draggable Action

**File:** `/src/actions/draggable.ts` (NEW FILE)

```typescript
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import type { Action } from 'svelte/action';

gsap.registerPlugin(Draggable);

export interface DraggableOptions {
  /**
   * Type of dragging: "x", "y", "x,y", "rotation", "scroll", "scrollTop", "scrollLeft"
   */
  type?: string;

  /**
   * Bounds for dragging
   */
  bounds?: Element | string | { minX?: number; maxX?: number; minY?: number; maxY?: number };

  /**
   * Enable inertia
   */
  inertia?: boolean;

  /**
   * Snap to grid or function
   */
  snap?: { x?: number; y?: number } | ((value: number) => number);

  /**
   * Lock axis when dragging
   */
  lockAxis?: boolean;

  /**
   * Minimum movement to trigger drag
   */
  minimumMovement?: number;

  /**
   * Z-index while dragging
   */
  zIndexBoost?: boolean;

  /**
   * Callbacks
   */
  onDragStart?: () => void;
  onDrag?: () => void;
  onDragEnd?: () => void;
  onPress?: () => void;
  onRelease?: () => void;

  /**
   * Disable draggable
   */
  disabled?: boolean;
}

export const gsapDraggable: Action<HTMLElement, DraggableOptions> = (
  node,
  options = {}
) => {
  let draggable: Draggable[] | null = null;

  const createDraggable = (opts: DraggableOptions) => {
    // Cleanup previous
    if (draggable) {
      draggable.forEach(d => d.kill());
      draggable = null;
    }

    if (opts.disabled) return;

    try {
      const {
        type = 'x,y',
        bounds,
        inertia,
        snap,
        lockAxis,
        minimumMovement,
        zIndexBoost,
        onDragStart,
        onDrag,
        onDragEnd,
        onPress,
        onRelease,
      } = opts;

      draggable = Draggable.create(node, {
        type,
        bounds,
        inertia,
        snap,
        lockAxis,
        minimumMovement,
        zIndexBoost,
        onDragStart,
        onDrag,
        onDragEnd,
        onPress,
        onRelease,
      });
    } catch (error) {
      console.error('[gsap-svelte] Draggable error:', error);
    }
  };

  createDraggable(options);

  return {
    update(newOptions: DraggableOptions) {
      createDraggable(newOptions);
    },

    destroy() {
      if (draggable) {
        draggable.forEach(d => d.kill());
        draggable = null;
      }
    }
  };
};
```

### 3.2 Draggable Component

**File:** `/src/components/GsapDraggable.svelte`

```svelte
<script lang="ts">
  import { gsapDraggable } from '../actions/draggable';
  import type { ElementType } from '../types';
  import type { DraggableOptions } from '../actions/draggable';

  export let element: ElementType = 'div';
  export let type: string = 'x,y';
  export let bounds: any = undefined;
  export let inertia: boolean = false;
  export let snap: any = undefined;
  export let lockAxis: boolean = false;
  export let disabled: boolean = false;

  let className: string = '';
  export { className as class };

  const browser = typeof window !== 'undefined';

  $: draggableProps = browser ? {
    type,
    bounds,
    inertia,
    snap,
    lockAxis,
    disabled,
    ...$$restProps
  } : { disabled: true };
</script>

<svelte:element
  this={element}
  use:gsapDraggable={draggableProps}
  class={className}
>
  <slot />
</svelte:element>
```

---

## Phase 4: Flip Integration (Week 6)

### 4.1 Flip Action

**File:** `/src/actions/flip.ts` (NEW FILE)

```typescript
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import type { Action } from 'svelte/action';

gsap.registerPlugin(Flip);

export interface FlipOptions {
  /**
   * Trigger flip when this value changes
   */
  trigger?: any;

  /**
   * Duration of flip animation
   */
  duration?: number;

  /**
   * Easing function
   */
  ease?: string | gsap.EaseFunction;

  /**
   * Animate absolute positioned elements
   */
  absolute?: boolean;

  /**
   * Scale during flip
   */
  scale?: boolean;

  /**
   * Fade during flip
   */
  fade?: boolean;

  /**
   * Custom animation vars
   */
  animation?: GSAPTweenVars;

  /**
   * Callback before flip
   */
  onEnter?: (elements: Element[]) => void;
  onLeave?: (elements: Element[]) => void;

  /**
   * Disable flip
   */
  disabled?: boolean;
}

export const gsapFlip: Action<HTMLElement, FlipOptions> = (
  node,
  options = {}
) => {
  let state: Flip.FlipState | null = null;

  const performFlip = (opts: FlipOptions) => {
    if (opts.disabled) return;

    try {
      // Capture state before change
      state = Flip.getState(node.children);

      // After DOM changes, animate to new state
      // This would typically be called after a state change in Svelte
      requestAnimationFrame(() => {
        if (!state) return;

        const {
          duration = 0.5,
          ease = 'power2.inOut',
          absolute,
          scale,
          fade,
          animation,
          onEnter,
          onLeave,
        } = opts;

        Flip.from(state, {
          duration,
          ease,
          absolute,
          scale,
          fade,
          onEnter,
          onLeave,
          ...animation,
        });
      });
    } catch (error) {
      console.error('[gsap-svelte] Flip error:', error);
    }
  };

  // Capture initial state
  if (!options.disabled) {
    state = Flip.getState(node.children);
  }

  return {
    update(newOptions: FlipOptions) {
      performFlip(newOptions);
    },

    destroy() {
      state = null;
    }
  };
};
```

---

## Phase 5: ScrollSmoother Integration (Week 7)

### 5.1 ScrollSmoother Component

**File:** `/src/components/GsapScrollSmoother.svelte`

```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollSmoother } from 'gsap/ScrollSmoother';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

  export let smooth: number = 1;
  export let effects: boolean = false;
  export let smoothTouch: number | boolean = 0;
  export let normalizeScroll: boolean = false;

  let smoother: ScrollSmoother | null = null;
  let wrapper: HTMLElement;
  let content: HTMLElement;

  onMount(() => {
    if (typeof window === 'undefined') return;

    try {
      smoother = ScrollSmoother.create({
        wrapper,
        content,
        smooth,
        effects,
        smoothTouch,
        normalizeScroll,
      });
    } catch (error) {
      console.error('[gsap-svelte] ScrollSmoother error:', error);
    }

    return () => {
      if (smoother) {
        smoother.kill();
        smoother = null;
      }
    };
  });

  onDestroy(() => {
    if (smoother) {
      smoother.kill();
      smoother = null;
    }
  });
</script>

<div bind:this={wrapper} id="smooth-wrapper">
  <div bind:this={content} id="smooth-content">
    <slot />
  </div>
</div>

<style>
  #smooth-wrapper {
    overflow: hidden;
  }
</style>
```

---

## File Structure After All Phases

```
gsap-svelte/
├── src/
│   ├── index.ts                    # Main exports
│   ├── actions.ts                  # Core actions
│   ├── timeline.ts                 # Timeline utilities
│   ├── utilities.ts                # NEW: Utility functions
│   ├── types.ts                    # TypeScript definitions
│   │
│   ├── actions/                    # NEW: Organized actions
│   │   ├── splitText.ts           # SplitText action
│   │   ├── draggable.ts           # Draggable action
│   │   ├── flip.ts                # Flip action
│   │   ├── motionPath.ts          # MotionPath action
│   │   ├── drawSVG.ts             # DrawSVG action
│   │   └── morphSVG.ts            # MorphSVG action
│   │
│   └── components/                 # Svelte components
│       ├── GsapAnimate.svelte     # Existing
│       ├── GsapFade.svelte        # Existing
│       ├── GsapSlide.svelte       # Existing
│       ├── GsapScale.svelte       # Existing
│       ├── GsapSet.svelte         # NEW
│       ├── GsapSplitText.svelte   # NEW
│       ├── GsapDraggable.svelte   # NEW
│       ├── GsapFlip.svelte        # NEW
│       ├── GsapScrollSmoother.svelte  # NEW
│       ├── GsapPin.svelte         # NEW
│       ├── GsapScrub.svelte       # NEW
│       └── GsapBatch.svelte       # NEW
```

---

## Testing Strategy

### Unit Tests (Future)

```typescript
// tests/actions/splitText.test.ts
import { describe, it, expect } from 'vitest';
import { gsapSplitText } from '$lib/actions/splitText';

describe('gsapSplitText', () => {
  it('splits text into characters', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello';

    const action = gsapSplitText(div, { type: 'chars' });

    expect(div.children.length).toBeGreaterThan(0);

    action.destroy();
  });
});
```

### Integration Tests (Future)

```typescript
// tests/integration/components.test.ts
import { render } from '@testing-library/svelte';
import { GsapSplitText } from '$lib';

describe('GsapSplitText Component', () => {
  it('renders and animates text', async () => {
    const { container } = render(GsapSplitText, {
      props: {
        type: 'chars',
        animation: { opacity: 0 }
      }
    });

    // Add assertions
  });
});
```

---

## Documentation Template

For each new feature, add to README.md:

```markdown
### Component Name

Brief description of what it does.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | 'default' | Description |
| prop2 | number | 0 | Description |

#### Example

\`\`\`svelte
<script>
  import { ComponentName } from '@gsap/svelte';
</script>

<ComponentName prop1="value" prop2={123}>
  Content
</ComponentName>
\`\`\`

#### Advanced Usage

\`\`\`svelte
<!-- More complex example -->
\`\`\`
```

---

## Version Release Strategy

### v1.0.0 (Current)
- ✅ Core animations (to/from/fromTo)
- ✅ Timeline utilities
- ✅ Basic ScrollTrigger
- ✅ Convenience actions (fade/slide/scale)

### v1.1.0 (Phase 1)
- ✅ gsap.utils exposed
- ✅ gsapSet action
- ✅ gsapQuickTo action
- ✅ Utility functions
- ✅ Better documentation

### v1.2.0 (Phase 2)
- ✅ SplitText integration
- ✅ Text animation examples
- ✅ Enhanced TypeScript types

### v1.3.0 (Phase 3)
- ✅ Draggable integration
- ✅ Flip plugin support
- ✅ Interactive examples

### v1.4.0 (Phase 4)
- ✅ ScrollSmoother
- ✅ Enhanced ScrollTrigger components
- ✅ MotionPath support

### v2.0.0 (Long-term)
- ✅ Full plugin ecosystem
- ✅ Custom effects system
- ✅ Advanced debugging tools
- ✅ Premium examples library

---

## Next Actions Checklist

### This Week
- [ ] Create `/src/utilities.ts`
- [ ] Expose `gsap.utils` in index.ts
- [ ] Implement `gsapSet` action
- [ ] Implement `gsapQuickTo` action
- [ ] Add utility functions
- [ ] Update types.ts
- [ ] Test in real project
- [ ] Update README.md
- [ ] Publish v1.1.0

### Next Week
- [ ] Design SplitText API
- [ ] Implement SplitText action
- [ ] Create GsapSplitText component
- [ ] Write comprehensive examples
- [ ] Create demos/showcase
- [ ] Test edge cases
- [ ] Update documentation
- [ ] Publish v1.2.0

### This Month
- [ ] Implement Draggable
- [ ] Implement Flip
- [ ] Community feedback
- [ ] Refine APIs
- [ ] More examples
- [ ] Blog post/announcement

---

**Last Updated:** December 31, 2025
**Status:** Ready for Implementation
**Next Phase:** Quick Wins (Week 1-2)
