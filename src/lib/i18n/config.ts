export const SUPPORTED_LANGUAGES = ['en', 'de', 'fr'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function is_supported(lang: string): lang is SupportedLanguage {
	return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export const DEFAULT_LANGUAGE = 'en' satisfies SupportedLanguage;

export function make_supported(lang: string): SupportedLanguage {
	return is_supported(lang) ? lang : DEFAULT_LANGUAGE;
}

export const COOKIE_NAME = 'language';

export const COOKIE_DURATION = 60 * 60 * 24 * 365;
