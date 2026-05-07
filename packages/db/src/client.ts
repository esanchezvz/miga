import { drizzle } from 'drizzle-orm/node-postgres';

import env, { isProduction } from '@miga/env';

const db = drizzle({
	connection: env.secret.DATABASE_URL,
	casing: 'snake_case',
	logger: !isProduction,
});

export type Database = typeof db;

export { db };
