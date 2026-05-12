import { prisma } from '$lib/prisma';

async function getProducts() {
	return await prisma.product.findMany({
		where: { isAvailableForPurchase: true },
		orderBy: { name: 'asc' }
	});
}

export const load = async () => {
	return {
		products: await getProducts()
	};
};
