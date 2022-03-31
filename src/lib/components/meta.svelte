<script>
  export let title
  export let description

  const formattedTitle = title ? `${title} - ohjinsu.me` : "ohjinsu.me"
</script>

<svelte:head>
  <title>{ formattedTitle }</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={formattedTitle} />
  <meta property="og:description" content={description} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={formattedTitle} />
  <meta name="twitter:description" content={description} />
</svelte:head>