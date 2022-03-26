<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Main from '$lib/components/main.svelte';
	import '../app.css';
</script>

<Header />
<Main>
	<slot />
</Main>
<Footer />