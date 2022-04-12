<script>
  import Meta from "$lib/components/meta.svelte"
  import { formatDate } from "$lib/utils/date";

  export let title

  export let description

  export let date

  export let section

  export let keywords

  const dateFormatted = `${formatDate(new Date(date), "수정")}`
</script>

<Meta title={title} description={description} date={date} section={section} keywords={keywords}/>

<header>
  {#if title}
    <h1>{title}</h1>
  {/if}

  {#if description}
    <p>{description}</p>
  {/if}

  {#if date}
    <time datetime={date}>{ dateFormatted }</time>
  {/if}
</header>

<article>
  <slot />
</article>

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
</footer>

<style>
  article {
    overflow-x: hidden;
  }

  header>p {
    font-size: 1.25rem;

    font-style: italic;
  }

  ul {
    display: flex;

    list-style: none;

    padding: 0;

    gap: 8px;
  }

  ul>li>a::before {
    content: "#";
  }
</style>
