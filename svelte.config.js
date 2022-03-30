import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: mdsvex({
		extensions: ['.svx, .md'],
		layout: {
			article: 'src/lib/layouts/article.svelte'
		}
	}),

	kit: {
		adapter: adapter(),
		vite: {
			server: {
				fs: {
					allow: ['..'],
				}
			},
		}
	},

	extensions: ['.svelte', '.md']
};

export default config;
