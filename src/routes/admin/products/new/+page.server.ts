import { addFormSchema } from '$lib/formSchema';
import { superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import fs from 'fs/promises';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/prisma.js';

export const load = async () => {
	return {
		form: await superValidate(zod(addFormSchema))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(addFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		// create products-file folder
		await fs.mkdir('productFile', { recursive: true });
		// file path
		const filePath = `productFile/${crypto.randomUUID()}-${form.data.name}`;
		await fs.writeFile(filePath, Buffer.from(await form.data.file.arrayBuffer()));

		// create products-image folder
		await fs.mkdir('static/productsIMG', { recursive: true });
		// image path
		const imagePath = `/productsIMG/${crypto.randomUUID()}-${form.data.image.name}`;
		await fs.writeFile(`static${imagePath}`, Buffer.from(await form.data.image.arrayBuffer()));

		try {
			await prisma.product.create({
				data: {
					name: form.data.name,
					description: form.data.description,
					priceInCents: form.data.priceInCents,
					filePath,
					imagePath,
					isAvailableForPurchase: false
				}
			});
		} catch (e) {
			console.error(e);
		}

		redirect(303, '/admin/products');
	}
};
