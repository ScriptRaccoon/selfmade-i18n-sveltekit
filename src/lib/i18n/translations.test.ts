import { get_paths } from '$lib/i18n/utils';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './config';
import { is_translation_key, TRANSLATIONS, type TranslationKey } from './translations';
import translations_en from '../translations/en.json';

describe('translations', () => {
	it('should have the same keys for each language', () => {
		const keys_reference = get_paths(TRANSLATIONS[DEFAULT_LANGUAGE]);
		for (const lang of SUPPORTED_LANGUAGES) {
			if (lang === DEFAULT_LANGUAGE) continue;
			const keys = get_paths(TRANSLATIONS[lang]);
			expect(keys).toEqual(keys_reference);
		}
	});
});

describe('TRANSLATIONS dictionary', () => {
	it('returns the translations for a given language', () => {
		expect(TRANSLATIONS.en).toEqual(translations_en);
	});
});

describe('TranslationKey type', () => {
	it('should accept valid keys', () => {
		'Todos.Title' satisfies TranslationKey;
		'Title' satisfies TranslationKey;
	});

	it('should not accept invalid keys', () => {
		// @ts-expect-error
		'InvalidKeyRandom' satisfies TranslationKey;
	});
});

describe('is_translation_key', () => {
	it('should return true for valid keys', () => {
		expect(is_translation_key('Todos.Title')).toBe(true);
		expect(is_translation_key('Title')).toBe(true);
	});

	it('should return false for invalid keys', () => {
		expect(is_translation_key('InvalidKeyRandom')).toBe(false);
	});
});
