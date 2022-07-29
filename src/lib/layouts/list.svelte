<script>
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
  import Header from '$lib/components/header.svelte';
	import Main from '$lib/components/main.svelte';

	import Meta from '$lib/components/meta.svelte';

	import { formatDate } from '$lib/utils/date';

	export let title;

	export let description;

	export let articles;
</script>

<Meta {title} {description} />

<Header>
	<Breadcrumbs category={title} title="" />
</Header>
<Main>
	<h1>{title}</h1>
	<p>{description}</p>
	{#if articles.length > 0}
		<ol>
			{#each articles as { title, date, href }}
				<li>
					<a {href}>
						{title}
					</a>
					/
					{formatDate(new Date(date))}
				</li>
			{/each}
		</ol>
	{:else}
		<p>결과가 없습니다.</p>
	{/if}
</Main>

<style>
	ol {
		display: flex;

		flex-direction: column-reverse;

		gap: 8px;

		list-style: none;

		padding: 0;
	}
</style>
