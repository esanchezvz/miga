import type { ZodObject } from 'zod';

export type EnvValidator = (env: Record<string, unknown>) => void;

const validate = <T extends ZodObject>(schema: T, obj: Record<string, unknown>) => {
	const parsed = schema.safeParse(obj);

	if (parsed.error) {
		const prettyErrors = parsed.error.issues
			.map(({ path, message }) => `- ${path.toString()}: ${message}`)
			.join('\n');

		throw Error(`Environment validation failed for:\n${prettyErrors}\n`);
	}
};

export { validate };
