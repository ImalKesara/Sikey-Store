import { prisma } from '$lib/prisma';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { env } from '$env/dynamic/private';
import { admin } from 'better-auth/plugins';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
	baseURL: env.BETTER_AUTH_URL,
	secret: env.BETTER_AUTH_SECRET,
	emailAndPassword: {
		enabled: true
	},
	database: prismaAdapter(prisma, {
		provider: 'sqlite'
	}),
	plugins: [admin(), sveltekitCookies(getRequestEvent)]
});
