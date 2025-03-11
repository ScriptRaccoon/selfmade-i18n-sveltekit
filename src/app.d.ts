import type { SupportedLanguage } from '$lib/i18n/config';

declare global {
	namespace App {
		interface Locals {
			lang?: SupportedLanguage;
		}
	}
}

export {};
