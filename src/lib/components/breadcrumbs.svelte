<script>
	import { AGILE_SOFTWARE, URLS } from '$lib/constants';

	export let category;

	export let title;
</script>

<nav>
	<ol>
		<li><a href="/">오진수</a></li>
		{#if category}
			<li>
				{#if title}
					&gt;
					<a href={`/${URLS[category]}`}>
						{category}
					</a>
				{:else}
        &gt; {category}
				{/if}
			</li>
		{/if}
		{#if title}
			<li>&gt; {title}</li>
		{/if}
	</ol>
</nav>

<style>
	ol {
    list-style: none;

		margin: 0;

		padding-left: 0;
	}

	li {
		display: inline;
	}
</style>
