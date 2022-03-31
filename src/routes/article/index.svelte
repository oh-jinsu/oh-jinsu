<script context="module">
  export const load = async ({ fetch, url }) => {
    const keyword = url.searchParams.get("keyword")

    const res = await fetch(`/article/json?keyword=${keyword}`)

    const articles = await res.json()

    return {
      props: {
        keyword,
        articles,
      }
    }
  }
</script>

<script>
  import List from "$lib/layouts/list.svelte";

  export let keyword

  export let articles
</script>

<List title="#{keyword}" articles={articles} />