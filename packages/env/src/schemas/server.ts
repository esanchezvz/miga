import type { z } from 'zod';

import { publicSchema } from './public';
import { secretSchema } from './secret';

const serverSchema = publicSchema.extend(secretSchema.shape);

type ServerSchema = z.infer<typeof serverSchema>;

export { type ServerSchema, serverSchema };
