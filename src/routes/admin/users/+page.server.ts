import { prisma } from '$lib/prisma.js';

export const load = async () => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			email: true,
			role: true,
			// means order table eke tiyena priceInCents
			orders: { select: { priceInCents: true } }
		},
		orderBy: { createdAt: 'desc' }
	});

	const filteredUsers = users.filter((role) => role.role === 'user');

	return { filteredUsers };
};

export const actions = {
	deleteUser: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		await prisma.user.delete({ where: { id } });
	}
};
