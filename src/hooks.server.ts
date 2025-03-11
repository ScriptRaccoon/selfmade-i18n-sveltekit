import type { Cookies, Handle } from '@sveltejs/kit';

import {
	COOKIE_NAME,
	DEFAULT_LANGUAGE,
	is_supported,
	type SupportedLanguage
} from '$lib/i18n/config';

function get_language_from_cookie(cookies: Cookies): SupportedLanguage | null {
	const language = cookies.get(COOKIE_NAME);
	return language && is_supported(language) ? language : null;
}

function get_language_from_header(headers: Headers): SupportedLanguage {
	const language_header = headers.get('accept-language');
	if (!language_header) return DEFAULT_LANGUAGE;

	const locale = language_header.split(',')[0];
	const language = locale.split('-')[0];

	return is_supported(language) ? language : DEFAULT_LANGUAGE;
}

export const handle = (async ({ event, resolve }) => {
	const language_in_cookie = get_language_from_cookie(event.cookies);
	const language_in_header = get_language_from_header(event.request.headers);
	const lang = language_in_cookie ?? language_in_header;
	event.locals.lang = lang;
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
}) satisfies Handle;
