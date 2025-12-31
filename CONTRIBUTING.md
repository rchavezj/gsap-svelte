# Contributing to @gsap/svelte

Thank you for considering contributing to @gsap/svelte! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/gsap-svelte.git
   cd gsap-svelte
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Build the package:
   ```bash
   pnpm build
   ```

5. Watch mode for development:
   ```bash
   pnpm dev
   ```

## Development Workflow

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Build and test:
   ```bash
   pnpm build
   pnpm typecheck
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

### Commit Message Convention

We follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add gsapRotate convenience action
fix: correct ScrollTrigger cleanup in gsapAnimate
docs: update README with advanced examples
```

## Code Guidelines

### TypeScript

- Use strict TypeScript
- Export types from `types.ts`
- Add JSDoc comments for public APIs

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in multi-line objects/arrays
- Keep functions small and focused

### Documentation

- Update README.md for new features
- Add JSDoc comments to functions
- Include usage examples
- Update TypeScript definitions

## Testing

Currently, we rely on TypeScript checking. Future plans include:

- Unit tests with Vitest
- Integration tests with Playwright
- Example app testing

To run type checking:
```bash
pnpm typecheck
```

## Project Structure

```
gsap-svelte/
├── src/
│   ├── actions.ts      # Main action implementations
│   ├── timeline.ts     # Timeline utilities
│   ├── types.ts        # TypeScript definitions
│   └── index.ts        # Main exports
├── examples/           # Example projects
├── dist/              # Built files (generated)
└── README.md          # Documentation
```

## Adding New Features

### New Action

1. Add implementation to `src/actions.ts`
2. Export from `src/index.ts`
3. Add TypeScript types if needed
4. Document in README.md with examples

Example:
```typescript
// In src/actions.ts
export const gsapRotate: GSAPAnimateAction = (node, options = {}) => {
  return gsapAnimate(node, {
    type: 'from',
    rotation: 0,
    ...options,
  });
};

// In src/index.ts
export { gsapRotate } from './actions';

// In README.md
### `gsapRotate`
...documentation...
```

### New Utility

1. Add to appropriate file (`timeline.ts` or new file)
2. Export from `src/index.ts`
3. Add types to `types.ts`
4. Document in README.md

## Pull Request Process

1. Ensure your code builds without errors:
   ```bash
   pnpm build
   pnpm typecheck
   ```

2. Update documentation:
   - README.md for user-facing changes
   - JSDoc comments for code changes
   - CHANGELOG.md (if exists)

3. Create a Pull Request:
   - Clear title describing the change
   - Description of what and why
   - Link any related issues

4. Address review feedback

5. Once approved, maintainers will merge

## Release Process

(For maintainers)

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Build: `pnpm build`
4. Test: `pnpm typecheck`
5. Publish: `npm publish` (after setting up npm auth)
6. Create GitHub release with tag

## Questions?

- Open a [GitHub Discussion](https://github.com/yourusername/gsap-svelte/discussions)
- Ask in [GSAP Forums](https://gsap.com/community/)
- Open an issue for bugs

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

All contributors will be recognized in the README.md and release notes.

Thank you for contributing! 🎉
