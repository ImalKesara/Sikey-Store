import { prisma } from '$lib/prisma';

function getMostPopluarProduct() {
	return prisma.product.findMany({
		where: { isAvailableForPurchase: true },
		take: 3,
		orderBy: { order: { _count: 'desc' } }
	});
}

function getNewstProduct() {
	return prisma.product.findMany({
		where: { isAvailableForPurchase: true },
		orderBy: { createdAt: 'desc' }
	});
}

export const load = async () => {
	const [mostPopularProduct, newsetProduct] = await Promise.all([
		getMostPopluarProduct(),
		getNewstProduct()
	]);

	return {
		mostPopularProduct,
		newsetProduct
	};
};
