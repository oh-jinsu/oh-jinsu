<script>
  import Meta from "$lib/components/meta.svelte"
  import { formatDate } from "$lib/utils/date";

  export let title

  export let description

  export let date

  // export let keywords

  const dateFormatted = `${formatDate(new Date(date), "수정")}`
</script>

<Meta title={`${title ? `${title}`: ``}${description ? `: ${description}` : ""}`} description={description} />

<!-- <header> -->
{#if title}
  <h1>{`${title}${description ? `: ${description}` : ''}`}</h1>
{/if}

{#if date}
  <time datetime={date}>{ dateFormatted }</time>
{/if}
<!-- </header> -->

<article>
  <slot />
</article>
<!-- 
<footer>
  {#if keywords?.length > 0}
    <ul>
      {#each keywords as keyword}
        <li>
          <a href="/article?keyword={keyword}">
            { keyword }
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</footer> -->

<style>
  article {
    overflow-x: hidden;
  }

  h1 {
    font-size: 3rem;
  }

  article {
    margin-top: 16px;
  }
</style>
