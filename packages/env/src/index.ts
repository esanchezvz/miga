import { type PublicSchema, validatePublicEnv } from './schemas/public';
import { type SecretSchema, validateSecretEnv } from './schemas/secret';
import { validateServerEnv } from './schemas/server';

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

const isEnvironment = (env: PublicSchema['APP_ENV']) => env === publicRuntimeEnv.APP_ENV;

const isProduction = isEnvironment('production');
const isDevelopment = isEnvironment('development');
const isStage = isEnvironment('stage');

const env = {
	public: publicRuntimeEnv as PublicSchema,
	secret: secretRuntimeEnv as SecretSchema,
};

export default env;

export { isDevelopment, isProduction, isStage, validatePublicEnv, validateSecretEnv, validateServerEnv };
