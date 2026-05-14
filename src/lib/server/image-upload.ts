import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import dns from 'node:dns';

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
	dns.setDefaultResultOrder('ipv4first');
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const base64 = buffer.toString('base64');
	const mimeType = file.type || 'image/jpeg';
	const dataUri = `data:${mimeType};base64,${base64}`;

	return cloudinary.uploader.upload(dataUri, {
		folder: 'sweets',
		timeout: 60000 // 60 second timeout
	});

	// return new Promise((resolve, reject) => {
	// 	const uploadStream = cloudinary.uploader.upload_stream(
	// 		{ folder: 'sweets' },

	// 		(error, result) => {
	// 			if (error) {
	// 				console.error('Cloudinary Upload Error Details:', error);
	// 				return reject(error);
	// 			}
	// 			if (!result) return reject(new Error('No result returned from cloudinary'));
	// 			resolve(result);
	// 		}
	// 	);

	// 	// Send the buffer data to the stream
	// 	uploadStream.end(buffer);
	// });
}
