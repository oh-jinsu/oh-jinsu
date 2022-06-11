<script>
  import Meta from "$lib/components/meta.svelte";

  import { formatDate } from "$lib/utils/date";

  export let title

  export let description

  export let articles
</script>

<Meta title={title} description={description} />

<h3>{ title }</h3>
{#if articles.length > 0}
  <ol>
    {#each articles as { title, description, date, keywords, href }}
      <li>
        <a href="{href}">
          { `${title}${description ? `: ${description}` : ""}` }
        </a>
        <footer>
          {#if date}
          <time datetime={date}>
            { formatDate(new Date(date), "수정") }
          </time>
        {/if}
        <!-- {#if keywords?.length > 0}
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
      </li>
    {/each}
  </ol>
{:else}
  <p>결과가 없습니다.</p>
{/if}

<style>
  footer {
    display: flex;

    gap: 8px;
  }

  ol {
    display: flex;

    flex-direction: column-reverse;

    gap: 24px;
  }

  /* ul {
    list-style-type: none;

    display: flex;

    padding: 0;

    gap: 8px;
  }

  ul>li>a::before {
    content: "#";
  } */
</style>
