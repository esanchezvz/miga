import { pgTable, text } from 'drizzle-orm/pg-core';

import { defaultColumns } from '~/utils/defaults';

const employee = pgTable('employees', {
	...defaultColumns,
	firstName: text().notNull(),
	paternalSurname: text().notNull(),
	maternalSurname: text().notNull(),
	phoneNumber: text().notNull().unique(),
	identityPin: text().notNull().unique(),
});

type InsertEmployee = typeof employee.$inferInsert;
type SelectEmployee = typeof employee.$inferSelect;

export { type InsertEmployee, type SelectEmployee, employee };
