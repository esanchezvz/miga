import type { z } from 'zod';

import { type EnvValidator, validate } from '../utils/validate';
import { publicSchema } from './public';
import { secretSchema } from './secret';

const selectedPublicSchema = publicSchema.pick({
	APP_ENV: true,
});

const serverSchema = selectedPublicSchema.extend(secretSchema.shape);

type ServerSchema = z.infer<typeof serverSchema>;

const validateServerEnv: EnvValidator = (env) => validate(serverSchema, env);

export { type ServerSchema, serverSchema, validateServerEnv };
