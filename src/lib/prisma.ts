import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';
import { PrismaClient } from '@prisma/client';

// import { PrismaClient } from '../../generated/prisma/client';
const connectionString = `${process.env.DATABASE_URL}`;

// const adapter = new PrismaBetterSqlite3({ url: connectionString });

const adapter = new PrismaLibSql({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_AUTH_TOKEN
});

const prisma = new PrismaClient({ adapter });

export { prisma };
