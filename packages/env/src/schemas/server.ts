import type { z } from 'zod';

import { publicSchema } from './public';
import { secretSchema } from './secret';

export const serverSchema = publicSchema.extend(secretSchema.shape);

export type ServerSchema = z.infer<typeof serverSchema>;
