import env, { isProduction } from '@miga/env';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle({
	connection: env.secret.DATABASE_URL,
	casing: 'snake_case',
	logger: !isProduction,
});

export type Database = typeof db;

export { db };
