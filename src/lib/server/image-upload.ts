import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';

import {
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME
} from '$env/static/private';

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	secure: true
});

export async function uploadImage(file: File): Promise<UploadApiResponse> {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{ folder: 'sweets' },
			(error, result) => {
				if (error) console.log(error);
				if (!result) return reject(new Error('No result returned from cloudinary' + error));
				resolve(result);
			}
		);

		// Send the buffer data to the stream
		uploadStream.end(buffer);
	});
}
