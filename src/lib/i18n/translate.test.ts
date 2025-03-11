import { t, translate } from './translate';

vi.mock('../translations/en.json', () => ({
	default: require('./mocks/en.mock.json')
}));

vi.mock('../translations/de.json', () => ({
	default: require('./mocks/de.mock.json')
}));

describe('translation function', () => {
	it('should translate for supported languages', () => {
		// @ts-expect-error The translation key is invalid because we mock the translation files
		expect(translate('message', 'en')).toBe('message');
		// @ts-expect-error The translation key is invalid because we mock the translation files
		expect(translate('profile.settings', 'en')).toBe('Settings');

		// @ts-expect-error The translation key is invalid because we mock the translation files
		expect(translate('message', 'de')).toBe('Nachricht');
		// @ts-expect-error The translation key is invalid because we mock the translation files
		expect(translate('profile.settings', 'de')).toBe('Einstellungen');
	});

	it('should translate to English for non-supported languages', () => {
		// @ts-expect-error The translation key is invalid because we mock the translation files
		expect(translate('message', 'ru')).toBe('message');
	});

	it('should return the key for non-valid keys', () => {
		// @ts-expect-error This is not possible since the translate function is typesafe
		expect(translate('invalid', 'en')).toBe('invalid');
	});

	it('should translate strings with a parameter', () => {
		// @ts-expect-error The translation key is invalid because we mock the translation files
		expect(translate('views', 'en', { count: '2' })).toBe('This page has 2 views');
		// @ts-expect-error The translation key is invalid because we mock the translation files
		expect(translate('views', 'de', { count: '10' })).toBe('Diese Seite hat 10 Aufrufe');
	});

	it('should use singular forms if applicable', () => {
		// @ts-expect-error The translation key is invalid because we mock the translation files
		expect(translate('views', 'en', { count: 1 })).toBe('This page has one view');
	});
});

describe('t function', () => {
	it(
		'should return the translation according to the context,' +
			'or the key when the context is not present',
		() => {
			vi.mock('svelte', () => ({ getContext: vi.fn().mockReturnValueOnce('de') }));

			// @ts-expect-error The translation key is invalid because we mock the translation files
			expect(t('profile.settings')).toBe('Einstellungen');
			// @ts-expect-error The translation key is invalid because we mock the translation files
			expect(t('profile.settings')).toBe('profile.settings');
		}
	);
});
