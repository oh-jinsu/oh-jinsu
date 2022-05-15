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
  export let status

  const message = status === 404 ? "페이지를 찾지 못했습니다." : "알 수 없는 오류입니다."
</script>

<h1>{ message }</h1>