<script>
	import Main from '$lib/components/main.svelte';
  import Meta from '$lib/components/meta.svelte';
  import { AGILE_SOFTWARE, AGILE_SOFTWARE_DESCRIPTION, DESCRIPTION, STARTUP_JOURNEY, STARTUP_JOURNEY_DESCRIPTION, TITLE, URLS } from '$lib/constants';
</script>

<Meta title="" description="" />
<Main>
	<h1>{TITLE}</h1>
	<p>
		{ DESCRIPTION }
		<a href="/why-you-should-hire-me">
			왜 저와 함께 일해야 할까요?
		</a>
	</p>
	<p>
		{ STARTUP_JOURNEY_DESCRIPTION }
    <a href={`/${URLS[STARTUP_JOURNEY]}`}>
      {STARTUP_JOURNEY}</a>을 살펴 보세요.
	</p>
	<p>
		{ AGILE_SOFTWARE_DESCRIPTION }
    <a href={`/${URLS[AGILE_SOFTWARE]}`}>
      {AGILE_SOFTWARE}</a>를 살펴 보세요.
	</p>
	<address>
		<a class="email" href="mailto:ohjinsu@codersproduct.com"> ohjinsu@codersproduct.com </a>
		<a class="portfolio" href="https://github.com/oh-jinsu" target="_blank">
			https://github.com/oh-jinsu
		</a>
	</address>
</Main>

<style>
	address {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	address > * {
		width: fit-content;
	}

	.email::before {
		content: '📪 ';
	}

	.portfolio::before {
		content: '💼 ';
	}
</style>
