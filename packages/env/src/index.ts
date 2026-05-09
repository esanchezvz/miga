import { type PublicSchema, publicSchema } from './schemas/public';
import type { SecretSchema } from './schemas/secret';
import { type ServerSchema, serverSchema } from './schemas/server';
import { type EnvValidator, validate } from './utils/validate';

declare const window: unknown;

type RuntimeEnv<Schema> = {
	[K in keyof Schema]: string | undefined;
};

const publicRuntimeEnv: RuntimeEnv<PublicSchema> = {
	APP_ENV: process.env.PUBLIC_APP_ENV,
};

const secretRuntimeEnv: RuntimeEnv<SecretSchema> = {
	DATABASE_URL: process.env.DATABASE_URL,
};

const serverRuntimeEnv: RuntimeEnv<ServerSchema> = {
	...publicRuntimeEnv,
	...secretRuntimeEnv,
};

const isBrowser = typeof window !== 'undefined';

const validatePublicEnv: EnvValidator = (env) => validate(publicSchema, env);
const validateServerEnv: EnvValidator = (env) => validate(serverSchema, env);

isBrowser ? validatePublicEnv(publicRuntimeEnv) : validateServerEnv(serverRuntimeEnv);

const isEnvironment = (env: PublicSchema['APP_ENV']) => env === publicRuntimeEnv.APP_ENV;

const isProduction = isEnvironment('production');
const isDevelopment = isEnvironment('development');
const isStage = isEnvironment('stage');

const env = {
	public: publicRuntimeEnv as PublicSchema,
	secret: secretRuntimeEnv as SecretSchema,
};

export default env;

export { isDevelopment, isProduction, isStage, validatePublicEnv, validateServerEnv };
