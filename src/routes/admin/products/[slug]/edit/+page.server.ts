import { superValidate, fail } from 'sveltekit-superforms';
import { addFormSchema } from '$lib/formSchema';
import { zod } from 'sveltekit-superforms/adapters';
import fs from 'fs/promises';
import { redirect } from '@sveltejs/kit';

//load data (according to specific slug/id(product id))
export const load = async ({ params: { slug } }) => {
	const product = await prisma.product.findUnique({
		where: { id: slug }
	});
	return {
		form: await superValidate(product, zod(addFormSchema), { errors: false }),
		product
	};
};

// edit product submit ---
export const actions = {
	default: async ({ request, params: { slug } }) => {
		const form = await superValidate(
			request,
			zod(addFormSchema.partial({ file: true, image: true }))
		);
		if (!form.valid) {
			return fail(400, { form });
		}
		const product = await prisma.product.findUnique({
			where: { id: slug }
		});
		if (!product) return;
		let filePath = product.filePath;
		// file exists
		if (form.data.file) {
			await fs.unlink(filePath);
			// new file path
			filePath = `productFile/${crypto.randomUUID()}-${form.data.file.name}`;
			await fs.writeFile(filePath, Buffer.from(await form.data.file.arrayBuffer()));
		}

		// for image
		let imagePath = product.imagePath;
		if (form.data.image) {
			await fs.unlink(`static${imagePath}`);
			imagePath = `/productsIMG/${crypto.randomUUID()}-${form.data.image.name}`;
			await fs.writeFile(`static${imagePath}`, Buffer.from(await form.data.image.arrayBuffer()));
		}

		try {
			await prisma.product.update({
				where: { id: slug },
				data: {
					name: form.data.name,
					description: form.data.description,
					priceInCents: form.data.priceInCents,
					filePath,
					imagePath
				}
			});
		} catch (e) {
			console.error(e);
		}
		redirect(303, '/admin/products');
		// goto('/admin/products');
	}
};
