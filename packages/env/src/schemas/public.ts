import { z } from 'zod';

const publicSchema = z.object({
	APP_ENV: z.enum(['development', 'stage', 'production']).default('development'),
});

type PublicSchema = z.infer<typeof publicSchema>;

export { type PublicSchema, publicSchema };
