<script>
import { AGILE_SOFTWARE, URLS } from "$lib/constants";


  export let category

  export let title
</script>

<nav>
  <a href="/">오진수</a>
  {#if category}
    {#if title}
      &gt;
      <a href={`/${URLS[AGILE_SOFTWARE]}`}>
        {category}
      </a>
    {:else}
      &gt; {category}
    {/if}
  {/if}
  {#if title}
  &gt; {title}
  {/if}
</nav>