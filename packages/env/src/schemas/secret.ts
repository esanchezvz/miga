import { z } from 'zod';

import { type EnvValidator, validate } from '../utils/validate';

const secretSchema = z.object({
	DATABASE_URL: z.string().min(1),
});

type SecretSchema = z.infer<typeof secretSchema>;

const validateSecretEnv: EnvValidator = (env) => validate(secretSchema, env);

export { type SecretSchema, secretSchema, validateSecretEnv };
