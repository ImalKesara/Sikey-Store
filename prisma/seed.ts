import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { Argon2id } from 'oslo/password';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const db = new PrismaClient({ adapter });

async function main() {
	const username = 'admin';
	const email = 'admin@donutstore.com';
	const password = 'Admin@123456';

	console.log('⏳ Creating admin user...');

	const hashedPassword = await new Argon2id().hash(password);

	const user = await db.user.upsert({
		where: { username },
		update: {},
		create: {
			id: crypto.randomUUID(),
			username,
			email,
			hashedPassword,
			isAdmin: true
		}
	});

	console.log('Admin user ready:');
	console.log('Username:', user.username);
	console.log('Email:   ', user.email);
	console.log('Password:', password);
	console.log('isAdmin: ', user.isAdmin);
}

main()
	.catch((e) => {
		console.error('❌ Seed failed:', e.message);
		process.exit(1);
	})
	.finally(() => db.$disconnect());
