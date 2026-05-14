import { prisma } from '$lib/prisma.js';

export const load = async () => {
	return {
		orders: await prisma.order.findMany({
			select: {
				id: true,
				priceInCents: true,
				product: { select: { name: true } },
				user: { select: { email: true } }
			},
			orderBy: { createdAt: 'desc' }
		})
	};
};

export const actions = {
	deleteOrder: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		await prisma.order.delete({ where: { id } });
	}
};
