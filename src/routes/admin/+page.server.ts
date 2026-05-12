import { prisma } from '$lib/prisma';

async function getSalesData() {
	const data = await prisma.order.aggregate({
		// means priceIncents tiyena ewaye withrk ekathuwa
		_sum: { priceInCents: true },
		_count: true
	});
	return {
		amount: (data._sum.priceInCents || 0) / 100,
		numberOfSales: data._count
	};
}

async function getUserData() {
	const [userCount, orderData] = await Promise.all([
		await prisma.user.count(),
		await prisma.order.aggregate({
			_sum: { priceInCents: true }
		})
	]);

	return {
		userCount,
		averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.priceInCents || 0) / userCount / 1000
	};
}

async function getProductData() {
	const [activeCount, inactiveCount] = await Promise.all([
		prisma.product.count({ where: { isAvailableForPurchase: true } }),
		prisma.product.count({ where: { isAvailableForPurchase: false } })
	]);

	return {
		activeCount,
		inactiveCount
	};
}

export const load = async () => {
	//load data parallel
	const [salesData, userData, productData] = await Promise.all([
		getSalesData(),
		getUserData(),
		getProductData()
	]);
	return {
		salesData,
		userData,
		productData
	};
};
