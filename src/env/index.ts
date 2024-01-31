import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.coerce.number().default(8080),

    MAILER_EMAIL: z.string().email(),
    MAILER_PASS: z.string(),

    MERCADO_LIVRE_CLIENT_ID: z.string(),
    MERCADO_LIVRE_CLIENT_SECRET: z.string(),

    CLOUDFLARE_ENDPOINT: z.string(),
    CLOUDFLARE_ACCESS_KEY: z.string(),
    CLOUDFLARE_SECRET_KET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    throw new Error(`[❌ Invalid environment variables] - ${_env.error}`);
}

export const env = _env.data;
