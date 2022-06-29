<script context="module">
import { AGILE_SOFTWARE, AGILE_SOFTWARE_DESCRIPTION } from "$lib/constants";

import List from "$lib/layouts/list.svelte";
import { toUrl } from "$lib/utils/url";

  export const prerender = false;
  export const load = async ({ fetch }) => {
    const res = await fetch(`/${toUrl(AGILE_SOFTWARE)}/json`)
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

<List title={AGILE_SOFTWARE} description={AGILE_SOFTWARE_DESCRIPTION} articles={articles} />