import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.coerce.number().default(8080),
    SECRET: z.coerce.string(),

    MERCADO_LIVRE_APP_ID: z.string(),
    MERCADO_LIVRE_SECRET_KEY: z.string(),

    AWS_BUCKET_NAME: z.string(),
    AWS_BUCKET_REGION: z.string(),
    AWS_ACCESS_KEY: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),

    DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    throw new Error(`[❌ Invalid environment variables] - ${_env.error}`);
}

export const env = _env.data;
