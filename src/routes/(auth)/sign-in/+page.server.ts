import { fail, redirect, type Actions } from '@sveltejs/kit';
import { auth } from '$lib/auth/server/auth';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const { email, password } = Object.fromEntries(formData);
		if (!email || !password) return fail(400, { message: 'Email and password are required' });
		try {
			await auth.api.signInEmail({
				body: {
					email: email as string,
					password: password as string
				},
				headers: event.request.headers
			});

			redirect(302, '/admin');
		} catch (e) {
			return fail(400, { message: (e as Error).message });
		}
	}
} satisfies Actions;
