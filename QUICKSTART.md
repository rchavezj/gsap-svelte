# Quick Start Guide

## Get Started in 5 Minutes

### 1. Install Dependencies

```bash
cd /home/claude/gsap-svelte
npm install
```

### 2. Build the Package

```bash
npm run build
```

### 3. Test in Your Project

Link the package locally:

```bash
# In gsap-svelte directory
npm link

# In your SvelteKit project (e.g., The Forest Church)
cd /path/to/your/project
npm link @gsap/svelte
```

### 4. Use in Your Components

```svelte
<script>
  import { gsapAnimate } from '@gsap/svelte';
</script>

<div use:gsapAnimate={{
  type: 'from',
  opacity: 0,
  y: 50,
  duration: 1
}}>
  Hello GSAP!
</div>
```

## Development Workflow

### Watch Mode

Run in watch mode while developing:

```bash
npm run dev
```

This rebuilds automatically when you make changes.

### Type Checking

Verify TypeScript types:

```bash
npm run typecheck
```

### Test Changes

1. Make changes in `src/`
2. Package rebuilds automatically (if using `npm run dev`)
3. Changes reflect immediately in linked projects
4. Refresh your SvelteKit dev server

## Project Structure

```
src/
├── index.ts       # Main exports - add new features here
├── actions.ts     # Animation actions - add new actions here
├── timeline.ts    # Timeline utilities - add new utilities here
└── types.ts       # TypeScript types - add new types here
```

## Adding a New Action

1. Add to `src/actions.ts`:
```typescript
export const gsapRotate: GSAPAnimateAction = (node, options = {}) => {
  return gsapAnimate(node, {
    type: 'from',
    rotation: 0,
    ...options,
  });
};
```

2. Export from `src/index.ts`:
```typescript
export { gsapRotate } from './actions';
```

3. Document in `README.md`

4. Build:
```bash
npm run build
```

## Testing in The Forest Church

```bash
# In gsap-svelte
npm link

# In The Forest Church project
npm link @gsap/svelte

# In your component
import { gsapAnimate } from '@gsap/svelte';
```

## Common Issues

### TypeScript Errors

If you see TypeScript errors:
```bash
npm run typecheck
```

Fix any type issues in `src/`.

### Build Errors

If build fails:
```bash
rm -rf dist node_modules
npm install
npm run build
```

### Link Not Working

Unlink and relink:
```bash
# In project
npm unlink @gsap/svelte

# In gsap-svelte
npm unlink

# Link again
npm link
# Then in project
npm link @gsap/svelte
```

## Next Steps

1. **Test Thoroughly**
   - Try all actions in real components
   - Test ScrollTrigger integration
   - Verify cleanup works
   - Test SSR compatibility

2. **Create Examples**
   - Build demo SvelteKit app
   - Showcase all features
   - Add to examples/ directory

3. **Publish**
   - Test package locally
   - Update version in package.json
   - npm publish

4. **Share**
   - Post on GSAP forums
   - Share on r/sveltejs
   - Tweet about it

## Resources

- **GSAP Docs**: https://gsap.com/docs
- **Svelte Actions**: https://svelte.dev/docs/svelte-action
- **TypeScript**: https://www.typescriptlang.org/docs

## Getting Help

- Check PROJECT_OVERVIEW.md for details
- Read CONTRIBUTING.md for guidelines
- Open GitHub discussions for questions

---

**You're all set!** Start by running `npm install` and `npm run build`.
