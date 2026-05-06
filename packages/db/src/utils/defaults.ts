import { createId } from '@paralleldrive/cuid2';
import { text, timestamp } from 'drizzle-orm/pg-core';

const defaultColumns = {
	id: text().primaryKey().$defaultFn(createId),
	createdAt: timestamp().defaultNow().notNull(),
	deletedAt: timestamp(),
	updatedAt: timestamp()
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
};

export { defaultColumns };
