<script>
  import Meta from "$lib/components/meta.svelte";

  import { formatDate } from "$lib/utils/date";

  export let title

  export let articles
</script>

<Meta title={title} description="" />

<h1>{ title }</h1>
{#if articles.length > 0}
  <ol>
    {#each articles as { title, description, date, keywords, href }}
      <li>
        {#if title}
          <h2>
            <a href="{href}">
              { title }
            </a>
          </h2>
        {/if}
        {#if description}
          <h3>
            { description }
          </h3>
        {/if}
        <footer>
          {#if date}
          <time datetime={date}>
            { formatDate(new Date(date), "수정") }
          </time>
        {/if}
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

    list-style: none;

    padding: 0;

    gap: 24px;
  }

  ul {
    list-style-type: none;

    display: flex;

    padding: 0;

    gap: 8px;
  }

  h2, h3 {
    margin: 0;
    padding: 0;

    line-height: 1.7;

    font-weight: normal;
  }

  ul>li>a::before {
    content: "#";
  }
</style>