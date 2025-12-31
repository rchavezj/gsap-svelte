import { defineConfig } from '@sveltepress/vite';
import { defaultTheme } from '@sveltepress/theme-default';

export default defineConfig({
  title: '@gsap/svelte',
  description: 'Official Svelte integration for GSAP animations',

  theme: defaultTheme({
    navbar: [
      {
        title: 'Home',
        to: '/'
      },
      {
        title: 'Docs',
        to: '/docs/getting-started'
      },
      {
        title: 'GitHub',
        to: 'https://github.com/rchavezj/gsap-svelte'
      }
    ],

    sidebar: {
      '/docs/': [
        {
          title: 'Getting Started',
          collapsible: false,
          items: [
            {
              title: 'Introduction',
              to: '/docs/getting-started'
            }
          ]
        },
        {
          title: 'Components',
          collapsible: false,
          items: [
            {
              title: 'Overview',
              to: '/docs/actions'
            }
          ]
        },
        {
          title: 'Advanced',
          collapsible: false,
          items: [
            {
              title: 'Timeline',
              to: '/docs/timeline'
            }
          ]
        }
      ]
    },

    // Custom home page layout
    homeLayout: 'custom'
  })
});
