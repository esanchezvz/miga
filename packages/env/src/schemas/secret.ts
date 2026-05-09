import { z } from 'zod';

const secretSchema = z.object({
	DATABASE_URL: z.string().min(1),
});

type SecretSchema = z.infer<typeof secretSchema>;

export { type SecretSchema, secretSchema };
