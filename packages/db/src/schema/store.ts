import { pgTable, text } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../utils/defaults';

const store = pgTable('stores', {
	...defaultColumns,
	name: text().notNull(),
	slug: text().notNull().unique(),
});

type InsertStore = typeof store.$inferInsert;
type SelectStore = typeof store.$inferSelect;

export { type InsertStore, type SelectStore, store };
