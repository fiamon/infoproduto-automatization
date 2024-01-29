import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.coerce.number().default(8080),
    MAILER_EMAIL: z.string().email(),
    MAILER_PASS: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    throw new Error(`[❌ Invalid environment variables] - ${_env.error}`);
}

export const env = _env.data;
