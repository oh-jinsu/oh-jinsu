<script context="module">
import List from "$lib/layouts/list.svelte";

  export const prerender = false;
  export const load = async ({ fetch }) => {
    const res = await fetch("/startup-journey/json")
    const articles = await res.json()
    return {
      props: {
        articles,
      }
    }
  }
</script>

<script>
  export let articles
</script>

<List title="스타트업 여행기" description="실전을 통해 성장하려고 해요." articles={articles} />