import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle({
	connection: 'postgresql://postgres:postgres@localhost:5432/postgres', // TODO: set-up environment variable
	casing: 'snake_case',
	logger: process.env.NODE_ENV !== 'production', // TODO: use isDevelopment env variable, after creating env package
});

export type Database = typeof db;

export { db };
