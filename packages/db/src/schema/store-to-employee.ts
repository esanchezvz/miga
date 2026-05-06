import { boolean, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';

import { employee } from './employee';
import { role } from './role';
import { store } from './store';

// Helps to determine what actions can an amployee do in each store
export const storeToEmployee = pgTable(
	'stores_to_employees',
	{
		storeId: text()
			.references(() => store.id)
			.notNull(),
		employeeId: text()
			.references(() => employee.id)
			.notNull(),
		roleId: text()
			.references(() => role.id)
			.notNull(),
		createdAt: timestamp().defaultNow().notNull(),
		isActive: boolean().default(true).notNull(),
	},
	(table) => [primaryKey({ columns: [table.storeId, table.employeeId, table.roleId] })],
);
