# Self-made Internationalization in SvelteKit

This project shows how to leverage a SvelteKit application in several languages, without using any additional library.

This is demonstrated with a simple todo app, but it could be any application. The routes are not changed.

### Files

The translation-related files are:

- `LanguageSelect.svelte` - the component that allows the user to select a language (saved in a cookie) that may differ from their browser default
- the folder `i18n` and all its contents - the main logic
- the `translations` folder - contains one JSON file per supported language
- `src/hooks.server.ts` - loads the language from the accent-language header or the cookie
- `src/routes/+layout.server.ts` - loads the language from the hook
- `src/routes/+layout.svelte` - sets the language as a context

### Usage

The main function is the `t` function exported from `i18n/translate.ts`. In a Svelte component, we can use it as follows.

```svelte
{t('Todos.Title')}
```

This function is fully typed and therefore offers a convenient autocompletion for the available keys.

Translations with parameters are also possible:

```json
// en.json

{
	"Summary": "There are {{ count }} todos in total."
}
```

```svelte
<!-- Todos.svelte -->

{t('Summary', { count: todos.length })}
```
