<script lang="ts">
	import { setContext } from 'svelte';
	import './app.css';
	import Nav from '$lib/components/Nav.svelte';
	import { t } from '$lib/i18n/translate';
	import type { SupportedLanguage } from '$lib/i18n/config';

	let { data, children } = $props();

	setContext<SupportedLanguage>('lang', data.lang);
</script>

<svelte:head>
	<title>{t('Title')}</title>
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
