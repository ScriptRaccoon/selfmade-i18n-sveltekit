import { get_deep_value, get_paths, type Paths } from './utils';

describe('get_deep_value', () => {
	it('should get a deep value', () => {
		const obj = {
			a: {
				b: {
					c: 'ok'
				}
			}
		};
		expect(get_deep_value(obj, 'a.b.c')).toBe('ok');
	});

	it('should get an immediate value', () => {
		const obj = {
			a: 'ok'
		};
		expect(get_deep_value(obj, 'a')).toBe('ok');
	});

	it('should return null if the path does not exist', () => {
		const obj = {
			a: {
				b: {
					c: 'd'
				}
			}
		};
		expect(get_deep_value(obj, 'a.u.c')).toBe(null);
	});

	it('should return null if the path ends early', () => {
		const obj = {
			a: {
				b: {
					c: 'd'
				}
			}
		};
		expect(get_deep_value(obj, 'a.b')).toBe(null);
	});

	it('should return null when the path is empty', () => {
		const obj = { key: 'val' };
		expect(get_deep_value(obj, '')).toBe(null);
	});
});

describe('get_paths', () => {
	it('should return the full paths through an object', () => {
		const obj = {
			a: {
				b: {
					c: 'x'
				},
				d: 'y'
			},
			e: 'z'
		};
		expect(get_paths(obj)).toEqual(['a.b.c', 'a.d', 'e']);
	});

	it('should return an empty array for an empty object', () => {
		expect(get_paths({})).toEqual([]);
	});

	it('should skip undefined values', () => {
		const obj = {
			a: {
				b: undefined
			},
			c: 'z'
		};
		expect(get_paths(obj)).toEqual(['c']);
	});
});

describe('Paths type', () => {
	it('should accept exactly the valid paths in an object', () => {
		type Example = {
			A: { B: string };
			C: string;
		};
		type L = Paths<Example>;

		'A.B' satisfies L;
		'C' satisfies L;
		// @ts-expect-error
		'A' satisfies L;
	});
});
