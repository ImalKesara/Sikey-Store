import { auth } from '$lib/auth/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authHandle: Handle = async ({ event, resolve }) => {
	return svelteKitHandler({ event, resolve, auth, building });
};

const sessionHandle: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});
	if (session) {
		event.locals.user = session.user;
		event.locals.session = session.session;
	}
	const response = await resolve(event);
	return response;
};

export const handle = sequence(authHandle, sessionHandle);
