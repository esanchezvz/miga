export const ENV_PREFIXES = ['PUBLIC_'];

/**
 * Picks up PUBLIC_ vars from the actual environment (CI/CD injected)
 * @returns Record<string, string | undefined>
 */
export const getPublicEnv = () => {
	return Object.fromEntries(
		Object.entries(process.env).filter(([key]) => ENV_PREFIXES.some((p) => key.startsWith(p))),
	);
};
