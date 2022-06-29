<script>
	// @ts-nocheck
	import Main from '$lib/components/main.svelte';
	import Readme from '../../README.md';
</script>

<Main>
	<h1>오진수</h1>
	<Readme />
	<p>
		실전을 통해서 성장하려고 해요. <a href="/startup-journey">스타트업 여행기</a>를 살펴 보세요.
	</p>
	<p>
		비즈니스의 성공을 주도하는 프로그래밍에 관해 생각해요. <a href="/agile-software"
			>애자일 소프트웨어</a
		>를 살펴 보세요.
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
