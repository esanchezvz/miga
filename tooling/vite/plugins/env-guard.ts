import type { Plugin } from 'vite';

import { getPublicEnv } from '../utils';

export type EnvValidator = (env: Record<string, string | undefined>) => void;

const envGuard = (validate?: EnvValidator): Plugin => ({
	name: 'env-guard',
	buildStart() {
		if (!validate) return;
		try {
			const env = getPublicEnv();
			validate(env);
		} catch (err) {
			// this.error kills the dev server immediately, prints to terminal
			this.error(err instanceof Error ? err.message : String(err));
		}
	},
});

export { envGuard };
