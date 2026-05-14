import { prisma } from '$lib/prisma.js';

export const load = async () => {
	return {
		users: await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				// means order table eke tiyena priceInCents
				order: { select: { priceInCents: true } }
			},
			orderBy: { createdAt: 'desc' }
		})
	};
};

export const actions = {
	deleteUser: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		await prisma.user.delete({ where: { id } });
	}
};
