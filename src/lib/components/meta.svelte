<script>
  export let title
  export let description

  const formattedTitle = title ? `${title} - ohjinsu.me` : "ohjinsu.me"
</script>

<svelte:head>
  <title>{ formattedTitle }</title>
  <meta name="description" content={description} />
</svelte:head>