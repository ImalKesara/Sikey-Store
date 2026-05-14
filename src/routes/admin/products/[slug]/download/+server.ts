import { prisma } from '$lib/prisma';
import fs from 'fs/promises';

export const GET = async ({ params: { slug } }) => {
	const product = await prisma.product.findUnique({
		where: {
			id: slug
		},
		select: {
			name: true,
			filePath: true
		}
	});

	if (!product) {
		return new Response('Product does not exist');
	}

	// stat - The fs.stat() method is used to return information about the given file or directory.
	const { size } = await fs.stat(product.filePath);
	const file = await fs.readFile(product.filePath);
	const extension = product.filePath.split('.').pop();

	return new Response(file, {
		headers: {
			'Content-Type': `application/${extension}`,
			'Content-Length': size.toString(),
			'Content-Disposition': `attachment; filename=${product.name}.${extension}`
		}
	});
};
