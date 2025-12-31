import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.svx'],
			rehypePlugins: [
				rehypeSlug,
				rehypeAutolinkHeadings
			],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const { codeToHtml } = await import('shiki');
					const html = await codeToHtml(code, {
						lang,
						theme: 'github-dark'
					});
					return `{@html \`${html}\` }`;
				}
			}
		})
	],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};

export default config;
