<script>
  import { getStructedData } from "../utils/meta.ts"

  export let title

  export let description

  export let date

  export let section

  export let keywords

  const name = title ? `${title} - ohjinsu.me` : "ohjinsu.me"
</script>

<svelte:head>
  <title>{ name }</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={name} />
  <meta property="og:description" content={description} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={name} />
  <meta name="twitter:description" content={description} />
  {@html getStructedData({name, title, description, date, section, keywords})}
</svelte:head>