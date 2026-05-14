import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	// if user doesn't exist
	if (!locals.user) {
		redirect(302, '/sign-in');
	}
};
