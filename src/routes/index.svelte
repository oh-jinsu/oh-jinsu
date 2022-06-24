<script context="module">
  export const prerender = false;

  export const load = async ({ fetch, url }) => {
    const res = await fetch(`/posts/json`)

    const posts = await res.json()

    return {
      props: {
        posts,
      }
    }
  }
</script>

<script>
  // @ts-nocheck
  import Readme from "../../README.md"
  import Portfolio from "$lib/components/portfolio.svelte";

  export let posts
</script>

<Readme />
<div class="space" />
<Portfolio posts={posts} />

<style>
  .space {
    height: 1px;
  }
</style>