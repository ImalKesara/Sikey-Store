import { fail, redirect, type Actions } from '@sveltejs/kit';
import { auth } from '$lib/auth/server/auth';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const { name, email, password } = Object.fromEntries(formData);
		if (!email || !password || !name)
			return fail(400, { message: 'Email, password, and name are required' });
		try {
			const data = await auth.api.signUpEmail({
				body: {
					name: name as string,
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
