import { z } from 'zod';

export const publicSchema = z.object({
	APP_ENV: z.enum(['development', 'stage', 'production']).default('development'),
});

export type PublicSchema = z.infer<typeof publicSchema>;
