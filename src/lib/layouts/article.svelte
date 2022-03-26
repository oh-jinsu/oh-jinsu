<script>
  import Meta from "$lib/components/meta.svelte"

  export let title

  export let description

  export let date

  const dateInstance = new Date(date)

  const year = dateInstance.getFullYear()

  const month = dateInstance.getMonth() + 1

  const day = dateInstance.getDay()

  const dateFormatted = `${year}년 ${month}월 ${day}일 수정`
</script>

<Meta title={title} description={description}/>

<header>
{#if title}
  <h1>{title}</h1>
{/if}

{#if description}
  <h2>{description}</h2>
{/if}

{#if date}
  <time datetime={date}>{ dateFormatted }</time>
{/if}
</header>

<article>
  <slot />
</article>

<style>
  article {
    overflow-x: hidden;
  }
</style>