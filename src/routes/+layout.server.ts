import { DEFAULT_LANGUAGE } from '$lib/i18n/config';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (e) => {
	return { lang: e.locals.lang ?? DEFAULT_LANGUAGE };
};
