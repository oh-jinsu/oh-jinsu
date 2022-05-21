<script context="module">
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
  import List from "$lib/layouts/list.svelte";

  export let articles
</script>

<List title="애자일 소프트웨어 개발" articles={articles} description="애자일 소프트웨어 개발에 관한 내용을 수록합니다" />
