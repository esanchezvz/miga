import { defineConfig } from 'drizzle-kit';

import env from '@miga/env';

const config = defineConfig({
	dialect: 'postgresql',
	schema: './src/schema',
	casing: 'snake_case',
	out: './migrations',
	migrations: {
		table: '__migrations',
		schema: 'drizzle',
	},
	dbCredentials: {
		url: env.secret.DATABASE_URL,
	},
});

export default config;
