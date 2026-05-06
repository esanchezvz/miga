import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core';

import { employee } from './employee';
import { user } from './user';

// All users can are employees, but not all employees are users
export const userToEmployee = pgTable(
	'users_to_employees',
	{
		employeeId: text()
			.references(() => employee.id)
			.notNull(),
		userId: text()
			.references(() => user.id)
			.notNull(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.employeeId] })],
);
