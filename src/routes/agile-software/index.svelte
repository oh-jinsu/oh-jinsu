<script context="module">
import List from "$lib/layouts/list.svelte";

  export const prerender = false;
  export const load = async ({ fetch }) => {
    const res = await fetch("/agile-software/json")
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

<List title="애자일 소프트웨어" description="비즈니스의 성공을 주도하는 프로그래밍에 관해 생각해요." articles={articles} />