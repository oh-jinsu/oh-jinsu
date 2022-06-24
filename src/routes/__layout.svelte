<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Main from '$lib/components/main.svelte';
	import '../app.css';
</script>

<Main>
	<slot />
</Main>
<Footer />