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

let _publicValidated = false;
const publicProxy = new Proxy(publicRuntimeEnv as PublicSchema, {
	get(target, prop: keyof PublicSchema) {
		if (!_publicValidated) {
			validatePublicEnv(publicRuntimeEnv);
			_publicValidated = true;
		}
		return target[prop];
	},
});

let _secretValidated = false;
const secretProxy = new Proxy(secretRuntimeEnv as SecretSchema, {
	get(target, prop: keyof SecretSchema) {
		if (typeof window !== 'undefined') {
			throw new Error(
				`❌ Attempted to access server-side environment variable '${String(prop)}' on the client.`,
			);
		}
		if (!_secretValidated) {
			validateSecretEnv(secretRuntimeEnv);
			_secretValidated = true;
		}
		return target[prop];
	},
});

const env = {
	public: publicProxy,
	secret: secretProxy,
};

export default env;

export { isDevelopment, isProduction, isStage, validatePublicEnv, validateSecretEnv, validateServerEnv };
