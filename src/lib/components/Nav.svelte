<script>
	import { t } from '$lib/i18n/translate';
	import LanguageSelect from './LanguageSelect.svelte';
</script>

<nav>
	<div></div>
	<ul>
		<li>
			<a href="/">{t('Home.Title')}</a>
		</li>
		<li>
			<a href="/todos"> {t('Todos.Title')}</a>
		</li>
	</ul>
	<div class="select-wrapper">
		<LanguageSelect />
	</div>
</nav>

<style>
	nav {
		padding-block: 1rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	ul {
		list-style-type: none;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.select-wrapper {
		text-align: right;
		padding-right: 1rem;
	}
</style>
