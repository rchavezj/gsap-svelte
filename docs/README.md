# @gsap/svelte Documentation

This is the documentation site for @gsap/svelte, built with SvelteKit and Tailwind CSS.

## Development

To run the documentation site locally:

```bash
bun install
bun run dev
```

The site will be available at `http://localhost:5173`

## Building

To build the static site:

```bash
bun run build
```

The built site will be in the `build/` directory.

## Preview

To preview the built site:

```bash
bun run preview
```

## Structure

- `/src/routes/` - Documentation pages (markdown and Svelte)
- `/src/lib/` - Reusable components
- `/src/lib/gsap-svelte/` - Library source (copied from parent)

## Adding Documentation

Documentation pages are written in Markdown (`.md` files) with MDsveX support.

Create a new page:

```bash
mkdir -p src/routes/docs/your-page
echo "# Your Page\n\nContent here" > src/routes/docs/your-page/+page.md
```

Add it to the navigation in `src/routes/+layout.svelte`.

## Deployment

This site can be deployed to any static hosting service:

- **Vercel**: Connect your repo and deploy
- **Netlify**: Connect your repo and deploy
- **GitHub Pages**: Build and push to gh-pages branch
- **Cloudflare Pages**: Connect your repo and deploy

All these platforms will automatically detect the SvelteKit adapter and build configuration.
