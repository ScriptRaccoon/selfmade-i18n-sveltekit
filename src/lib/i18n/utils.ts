type NestedStringObject = {
	[key: string]: undefined | string | NestedStringObject;
};

export function get_deep_value(obj: NestedStringObject, path: string): string | null {
	if (!path) return null;
	return get_nested_value(obj, path.split('.'));
}

function get_nested_value(obj: NestedStringObject, segments: string[]): string | null {
	if (segments.length === 0) return null;
	const [first, ...rest] = segments;
	const next = obj[first];
	if (typeof next === 'string') {
		return next;
	}
	if (typeof next === 'undefined') return null;
	return get_nested_value(next, rest);
}

export function get_paths(obj: NestedStringObject): string[] {
	const paths: string[] = [];
	for (const key in obj) {
		const val = obj[key];
		if (typeof val === 'undefined') continue;
		if (typeof val === 'string') {
			paths.push(key);
			continue;
		}
		for (const leaf of get_paths(val)) {
			paths.push(`${key}.${leaf}`);
		}
	}
	return paths;
}

export type Paths<T extends NestedStringObject, Prefix extends string = ''> = {
	[K in keyof T]: K extends string
		? T[K] extends NestedStringObject
			? Paths<T[K], `${Prefix}${K}.`>
			: `${Prefix}${K}`
		: never;
}[keyof T];
