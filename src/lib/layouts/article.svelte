<script>
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Header from '$lib/components/header.svelte';
	import Main from '$lib/components/main.svelte';
	import Meta from '$lib/components/meta.svelte';
	import { formatDate } from '$lib/utils/date';

	export let title;

	export let description;

	export let date;

	export let category;

	export let keywords;

	export let image;

	const dateFormatted = `${formatDate(new Date(date), '작성')}`;
</script>

<Meta {title} {description} {keywords} />

<Header>
	<Breadcrumbs {category} {title} />
</Header>
<Main>
	{#if title}
		<h1>{title}</h1>
	{/if}
	{#if date}
		<time datetime={date}>
			<p>
				{dateFormatted}
			</p>
		</time>
	{/if}
	{#if image}
		<img src={image} alt="header" />
	{/if}
	<slot />
</Main>

<style>
	img {
		margin: 16px 0;
	}
</style>