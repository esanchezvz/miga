import { index, pgTable, text } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../utils/defaults';

const createIndex = (name: string) => index(`user-${name}`);

const user = pgTable(
	'users',
	{
		...defaultColumns,
		firstName: text().notNull(),
		middleName: text(),
		paternalSurname: text().notNull(),
		maternalSurname: text().notNull(),
		email: text().notNull().unique(),
		username: text().notNull().unique(),
	},
	(table) => [
		createIndex('full_name_idx').on(
			table.firstName,
			table.middleName,
			table.paternalSurname,
			table.maternalSurname,
		),
		createIndex('email_idx').on(table.email),
	],
);

type InsertUser = typeof user.$inferInsert;
type SelectUser = typeof user.$inferSelect;

export { type InsertUser, type SelectUser, user };
