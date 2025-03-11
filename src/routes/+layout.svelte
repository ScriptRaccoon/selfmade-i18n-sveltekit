<script lang="ts">
	import './app.css';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Simple Todo App</title>
</svelte:head>

<Nav />

<main>
	{@render children()}
</main>

<style>
	main {
		max-width: 50rem;
		margin: 0 auto;
		padding-inline: 1rem;
	}
</style>
