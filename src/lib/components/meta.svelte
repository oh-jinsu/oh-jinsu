<script>
  import { page } from '$app/stores';

  import { DESCRIPTION, TITLE } from "$lib/constants";

  const url = $page.url;

  export let title

  export let description

  export let keywords = []

  const metaTitle = title ? `${title} - ${TITLE}` : TITLE

  const metaDescription = description || DESCRIPTION
</script>

<svelte:head>
  <title>{ metaTitle }</title>
  <meta name="description" content={metaDescription} />
  <meta name="keywords" content={keywords.join(", ")} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={metaTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <link rel="canonical" href={url} />
</svelte:head>
