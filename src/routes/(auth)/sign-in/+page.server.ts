import { fail, redirect, type Actions } from '@sveltejs/kit';
import { auth } from '$lib/auth/server/auth';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const { email, password } = Object.fromEntries(formData);
		if (!email || !password) return fail(400, { message: 'Email and password are required' });
		try {
			const data = await auth.api.signInEmail({
				body: {
					email: email as string,
					password: password as string
				},
				headers: event.request.headers
			});

			return { success: true };
		} catch (e) {
			return fail(400, { message: (e as Error).message });
		}
	}
} satisfies Actions;
