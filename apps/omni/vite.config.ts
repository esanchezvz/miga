import { validatePublicEnv } from '@miga/env';
import { createConfig } from '@miga/vite/react';

// https://vite.dev/config/
export default createConfig(import.meta.dirname, { validateEnv: validatePublicEnv });
