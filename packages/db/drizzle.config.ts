import { defineConfig } from 'drizzle-kit';

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
		url: 'postgresql://postgres:postgres@localhost:5432/postgres', // TODO: set-up environment variable
	},
});

export default config;
