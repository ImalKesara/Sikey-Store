import fs from 'fs/promises';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/prisma.js';
import { uploadImage } from '$lib/server/image-upload.js';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const priceInCents = formData.get('priceInCents') as string;
		const file = formData.get('imageupload') as File;

		try {
			const uploadedImg = await uploadImage(file);
			await prisma.product.create({
				data: {
					name: name,
					description: description,
					priceInCents: Number(priceInCents),
					imagePath: uploadedImg.secure_url,
					isAvailableForPurchase: false
				}
			});
		} catch (e) {
			console.error(e);
		}

		redirect(303, '/admin/products');
	}
};
