import translations_en from '../translations/en.json';
import translations_de from '../translations/de.json';
import translations_fr from '../translations/fr.json';

import { get_paths, type Paths } from './utils';

export const TRANSLATIONS = {
	en: translations_en,
	de: translations_de,
	fr: translations_fr
} as const;

export type TranslationKey = Paths<typeof translations_en>;

const TRANSLATION_KEYS = get_paths(translations_en);

export function is_translation_key(key: string): key is TranslationKey {
	return TRANSLATION_KEYS.includes(key);
}
