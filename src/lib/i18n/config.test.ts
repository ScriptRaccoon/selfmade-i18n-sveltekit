import { is_supported, make_supported } from './config';

describe('is_supported', () => {
	it('returns true for en, de', () => {
		expect(is_supported('en')).toBe(true);
		expect(is_supported('de')).toBe(true);
	});

	it('returns false for ru', () => {
		expect(is_supported('ru')).toBe(false);
	});
});

describe('make_supported', () => {
	it('does not change en, de', () => {
		expect(make_supported('en')).toBe('en');
		expect(make_supported('de')).toBe('de');
	});

	it('changes ru to en', () => {
		expect(make_supported('ru')).toBe('en');
	});
});
