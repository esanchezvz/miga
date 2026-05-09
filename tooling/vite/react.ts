import path from 'node:path';

import react from '@vitejs/plugin-react';
import { type UserConfig, defineConfig, loadEnv } from 'vite';

const ENV_VAR_PREFIX = 'PUBLIC_';

const createConfig = (dirname: string, overrides: UserConfig = {}) => {
	const repoRoot = path.resolve(dirname, '../../'); // apps/<app-name> → root
	const env = loadEnv('', repoRoot, ENV_VAR_PREFIX);

	return defineConfig({
		plugins: [react()],
		envPrefix: ENV_VAR_PREFIX,
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
