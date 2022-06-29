<script>
	import { AGILE_SOFTWARE, URLS } from '$lib/constants';

	export let category;

	export let title;
</script>

<nav>
	<ol>
		<li>
			<a href="/">오진수</a>
		</li>
		{#if category}
			<li>
				{#if title}
					&nbsp;&gt;
					<a href={`/${URLS[AGILE_SOFTWARE]}`}>
						{category}
					</a>
				{:else}
        &nbsp;&gt; {category}
				{/if}
			</li>
		{/if}
		{#if title}
			<li>
				&nbsp;&gt; {title}
			</li>
		{/if}
	</ol>
</nav>

<style>
	ol {
    display: flex;

    list-style: none;

		margin: 0;
	}
</style>
