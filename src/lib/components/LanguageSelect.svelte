<script lang="ts">
	import { getContext } from 'svelte';

	import {
		COOKIE_DURATION,
		COOKIE_NAME,
		SUPPORTED_LANGUAGES,
		type SupportedLanguage
	} from '$lib/i18n/config';

	const flag_emojis = {
		en: '🇬🇧',
		de: '🇩🇪',
		fr: '🇫🇷'
	} as const;

	const current_language = getContext<SupportedLanguage>('lang');

	let selected_language = $state(current_language);

	async function update_language() {
		document.cookie = `${COOKIE_NAME}=${selected_language}; path=/; max-age=${COOKIE_DURATION}`;
		window.location.reload();
	}
</script>

<select class="select" bind:value={selected_language} onchange={update_language}>
	{#each SUPPORTED_LANGUAGES as lang}
		<option value={lang} selected={lang === current_language}>
			{flag_emojis[lang]}
			{lang}
		</option>
	{/each}
</select>
