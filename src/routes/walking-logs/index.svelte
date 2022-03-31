<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch("/walking-logs/json")

    const articles = await res.json()

    return {
      props: {
        articles,
      }
    }
  }
</script>

<script>
  import List from "$lib/layouts/list.svelte";

  export let articles
</script>

<List title="산책 일지" articles={articles} />