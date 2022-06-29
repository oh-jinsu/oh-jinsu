<script>
	// @ts-nocheck
	import Main from '$lib/components/main.svelte';
  import Meta from '$lib/components/meta.svelte';
  import { AGILE_SOFTWARE, DESCRIPTION, ORIGIN, STARTUP_JOURNEY, TITLE } from '$lib/constants';
  import { toUrl } from '$lib/utils/url';
</script>

<Meta title="" description="" canonical={ORIGIN} />
<Main>
	<h1>{TITLE}</h1>
	<p>{DESCRIPTION}</p>
	<p>
		실전을 통해서 성장하려고 해요.
    <a href={`/${toUrl(STARTUP_JOURNEY)}`}>
      {STARTUP_JOURNEY}</a>를 살펴 보세요.
	</p>
	<p>
		비즈니스의 성공을 주도하는 프로그래밍에 관해 생각해요.
    <a href={`/${toUrl(AGILE_SOFTWARE)}`}>
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
