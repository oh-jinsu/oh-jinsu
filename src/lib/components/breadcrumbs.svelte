<script>
  export let category

  export let title
</script>

<nav>
  <a href="/">오진수</a>
  {#if category}
    {#if title}
      &gt;
      <a href={`/${category.replace(" ", "-")}`}>
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