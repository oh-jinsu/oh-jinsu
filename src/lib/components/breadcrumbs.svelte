<script>
  export let category

  export let title

  const categoryHref = {
		'스타트업 여행기': '/startup-journey',
		'애자일 소프트웨어': '/agile-software'
	}[category];
</script>

<nav>
  <a href="/">오진수</a>
  {#if category}
    {#if title}
      &gt;
      <a href={categoryHref}>
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