import { type PublicSchema, publicSchema } from './schemas/public';
import type { SecretSchema } from './schemas/secret';
import { type ServerSchema, serverSchema } from './schemas/server';

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

const parsed =
	typeof window !== 'undefined'
		? publicSchema.safeParse(publicRuntimeEnv)
		: serverSchema.safeParse(serverRuntimeEnv);

if (parsed.error) {
	const prettyErrors = parsed.error.issues
		.map(({ path, message }) => `- ${path.toString()}: ${message}`)
		.join('\n');

	throw Error(`Environment validation failed for:\n${prettyErrors}\n`);
}

const isProduction = parsed.data.APP_ENV === 'production';
const isDevelopment = parsed.data.APP_ENV === 'development';
const isStage = parsed.data.APP_ENV === 'stage';

const env = {
	public: publicRuntimeEnv as PublicSchema,
	secret: secretRuntimeEnv as SecretSchema,
};

export default env;

export { isDevelopment, isProduction, isStage };
