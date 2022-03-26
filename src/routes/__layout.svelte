<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<Header />
<main>
	<slot />
</main>
<Footer />

<style>
	main {
		flex: 1;

		max-width: 768px;
		
		width: 100%;

		padding: 16px;
	}
</style>