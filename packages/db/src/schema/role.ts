import { pgTable, text } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../utils/defaults';

const ROLES = ['admin', 'super_admin', 'cashier', 'epmloyee'] as const;

export type Role = (typeof ROLES)[number];

const role = pgTable('roles', {
	...defaultColumns,
	name: text({ enum: ROLES }).notNull().unique(),
});

type InsertRole = typeof role.$inferInsert;
type SelectRole = typeof role.$inferSelect;

export { type InsertRole, role, type SelectRole };
