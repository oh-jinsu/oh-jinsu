import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				article: 'src/lib/layouts/article.svelte'
			}
		})
	],

	kit: {
		adapter: adapter(),
	},

	extensions: ['.svelte', '.md']
};

export default config;
