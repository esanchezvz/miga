import { z } from 'zod';

import { type EnvValidator, validate } from '../utils/validate';

const publicSchema = z.object({
	APP_ENV: z.enum(['development', 'stage', 'production']).default('development'),
});

type PublicSchema = z.infer<typeof publicSchema>;

const validatePublicEnv: EnvValidator = (env) => validate(publicSchema, env);

export { type PublicSchema, publicSchema, validatePublicEnv };
