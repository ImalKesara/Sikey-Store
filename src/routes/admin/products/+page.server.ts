import { prisma } from '$lib/prisma.js';
import fs from 'fs/promises';

export const load = async () => {
	return {
		products: await prisma.product.findMany({
			select: {
				id: true,
				name: true,
				priceInCents: true,
				isAvailableForPurchase: true,
				imagePath: true,
				_count: {
					select: {
						order: true
					}
				}
			},
			orderBy: { name: 'asc' }
		})
	};
};

export const actions = {
	toggleAvailability: async ({ request }) => {
		const formData = await request.formData();
		//  name = "id" in form
		const id = formData.get('id') as string;
		const isAvailableForPurchase = formData.has('isAvailableForPurchase');
		await prisma.product.update({
			where: { id },
			data: {
				isAvailableForPurchase
			}
		});
	},
	deleteProduct: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const product = await prisma.product.findUnique({
			where: { id: id },
			select: { _count: { select: { order: true } } }
		});

		if (product && product._count.order > 0) return;
		const deletedProduct = await prisma.product.delete({
			where: { id }
		});

		// `static${imagePath}`
		await fs.unlink(deletedProduct.filePath);
		await fs.unlink(`static${deletedProduct.imagePath}`);
	}
};
