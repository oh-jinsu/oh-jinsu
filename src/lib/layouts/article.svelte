<script>
	import Header from '$lib/components/header.svelte';
	import Main from '$lib/components/main.svelte';
	import Meta from '$lib/components/meta.svelte';
	import { formatDate } from '$lib/utils/date';

	export let title;

	export let description;

	export let date;

	export let category;

	const categoryHref = {
		'스타트업 여행기': '/startup-journey',
		'애자일 소프트웨어': '/agile-software'
	}[category];

	const dateFormatted = `${formatDate(new Date(date), '작성')}`;
</script>

<Meta {title} {description} />

<Header>
	<nav>
		<a href="/">오진수</a>
		>
		<a href={categoryHref}>{category}</a>
		> {title}
	</nav>
</Header>
<Main>
	<article>
		{#if title}
			<h1>{title}</h1>
		{/if}
		{#if date}
			<time datetime={date}>{dateFormatted}</time>
		{/if}
		<slot />
	</article>
</Main>

<style>
	article {
    display: flex;

    flex-direction: column;

		overflow-x: hidden;
	}

	h1 {
		font-size: 3rem;

    align-self: center;
	}

  time {
    align-self: center;

    margin-bottom: 32px;
  }
</style>
