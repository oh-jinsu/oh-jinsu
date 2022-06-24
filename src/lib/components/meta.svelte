<script>
  export let title

  export let description

  const name = title ? `${title} - 오진수` : "오진수"

  const _description = description || `산책 일지와 애자일 소프트웨어 개발에 관한 내용을 수록합니다.`
</script>

<svelte:head>
  <title>{ name }</title>
  <meta name="description" content={_description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={name} />
  <meta property="og:description" content={_description} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={name} />
  <meta name="twitter:description" content={_description} />
</svelte:head>
