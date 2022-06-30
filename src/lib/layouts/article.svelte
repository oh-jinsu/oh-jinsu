<script>
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Header from '$lib/components/header.svelte';
	import Main from '$lib/components/main.svelte';
	import Meta from '$lib/components/meta.svelte';
	import { ORIGIN, URLS } from '$lib/constants';
	import { formatDate } from '$lib/utils/date';

	export let title;

	export let slug;

	export let description;

	export let date;

	export let category;

	export let keywords;

	const dateFormatted = `${formatDate(new Date(date), '작성')}`;

	const canonical = `${ORIGIN}/${URLS[category]}/${slug}`;
</script>

<Meta {title} {description} {canonical} {keywords} />

<Header>
	<Breadcrumbs {category} {title} />
</Header>
<Main>
	{#if title}
		<h1>{title}</h1>
	{/if}
	{#if date}
		<time datetime={date}>{dateFormatted}</time>
	{/if}
	<slot />
</Main>
