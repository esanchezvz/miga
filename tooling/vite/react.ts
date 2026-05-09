import path from 'node:path';

import react from '@vitejs/plugin-react';
import { type UserConfig, defineConfig } from 'vite';

import { type EnvValidator, envGuard } from './plugins/env-guard';
import { ENV_PREFIXES, getPublicEnv } from './utils';

const createConfig = (
	dirname: string,
	options: {
		overrides?: UserConfig;
		validateEnv: EnvValidator; // This is here to prevent importing runtime logic for tooling/infra package
	},
) => {
	const { overrides = {}, validateEnv } = options;
	const env = getPublicEnv();

	return defineConfig({
		plugins: [envGuard(validateEnv), react()],
		envPrefix: ENV_PREFIXES,
		define: {
			'process.env': env,
		},
		resolve: {
			alias: {
				'~': path.resolve(dirname, './src'),
			},
		},
		...overrides,
	});
};

export { createConfig };
