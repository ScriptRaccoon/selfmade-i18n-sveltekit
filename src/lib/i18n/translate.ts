import { get_deep_value } from './utils';
import { getContext } from 'svelte';
import { make_supported, type SupportedLanguage } from './config';
import { is_translation_key, TRANSLATIONS, type TranslationKey } from './translations';

export function translate(
	key: TranslationKey,
	lang: string,
	parameters?: Record<string, unknown>
): string {
	const supported_lang = make_supported(lang);
	const translation = TRANSLATIONS[supported_lang];

	const value = get_deep_value(translation, key);

	if (value === null) return key;

	if (!parameters) {
		return value;
	}

	let parsed_value = value;

	const singular_key = `${key}@Singular`;
	const singular_is_available = parameters?.count === 1 && is_translation_key(singular_key);

	if (singular_is_available) {
		const { count, ...rest } = parameters;
		return translate(singular_key, lang, rest);
	}

	for (const [param_key, param_value] of Object.entries(parameters)) {
		parsed_value = parsed_value.replaceAll(`{{ ${param_key} }}`, String(param_value));
	}

	return parsed_value;
}

export function t(key: TranslationKey, parameters?: Record<string, unknown>): string {
	const lang = getContext<SupportedLanguage | undefined>('lang');
	if (!lang) return key;
	return translate(key, lang, parameters);
}
