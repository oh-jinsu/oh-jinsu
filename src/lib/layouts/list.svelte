<script>
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
  import Header from '$lib/components/header.svelte';
	import Main from '$lib/components/main.svelte';

	import Meta from '$lib/components/meta.svelte';
  import { ORIGIN, URLS } from '$lib/constants';

	import { formatDate } from '$lib/utils/date';

	export let title;

	export let description;

	export let articles;

  const canonical = `${ORIGIN}/${URLS[title]}`
</script>

<Meta {title} {description} {canonical}/>

<Header>
	<Breadcrumbs category={title} title="" />
</Header>
<Main>
	{#if articles.length > 0}
		<ol>
			{#each articles as { title, date, href }}
				<li>
					<a {href}>
						{title}
					</a>
					{#if date}
						<time datetime={date}>
							{formatDate(new Date(date))}
						</time>
					{/if}
				</li>
			{/each}
		</ol>
	{:else}
		<p>결과가 없습니다.</p>
	{/if}
</Main>

<style>
	time {
		display: block;
	}

	ol {
		display: flex;

		flex-direction: column-reverse;

		gap: 8px;
	}
</style>
