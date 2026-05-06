import { z } from 'zod';

export const secretSchema = z.object({
	DATABASE_URL: z.string().min(1),
});

export type SecretSchema = z.infer<typeof secretSchema>;
