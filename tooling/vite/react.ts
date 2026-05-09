import path from 'node:path';

import react from '@vitejs/plugin-react';
import { type UserConfig, defineConfig } from 'vite';

const createConfig = (dirname: string, overrides: UserConfig = {}) => {
	return defineConfig({
		plugins: [react()],
		envPrefix: ['PUBLIC_'],
		resolve: {
			alias: {
				'~': path.resolve(dirname, './src'),
			},
		},
		...overrides,
	});
};

export { createConfig };
