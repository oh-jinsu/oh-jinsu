<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        error,
        status,
      }
    }
  }
</script>

<script>
import Breadcrumbs from "$lib/components/breadcrumbs.svelte"
import Header from "$lib/components/header.svelte"

  export let status

  const message = status === 404 ? "페이지를 찾지 못했습니다." : "알 수 없는 오류입니다."
</script>

<Header>
  <Breadcrumbs category={message} title="" />
</Header>
<h1>{ message }</h1>