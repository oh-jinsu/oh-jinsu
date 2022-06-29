<script context="module">
import { STARTUP_JOURNEY, STARTUP_JOURNEY_DESCRIPTION, URLS } from "$lib/constants";

import List from "$lib/layouts/list.svelte";

  export const prerender = false;
  export const load = async ({ fetch }) => {
    const res = await fetch(`/${URLS[STARTUP_JOURNEY]}/json`)
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

<List title={STARTUP_JOURNEY} description={STARTUP_JOURNEY_DESCRIPTION} articles={articles} />