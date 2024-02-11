import axios, { AxiosResponse } from 'axios';
import { env } from '../env';
import { PrismaClient } from '@prisma/client';
import { RefreshToken } from '../@types';

const prisma = new PrismaClient();

export async function updateMercadoLivreRefreshToken() {
    const getTheLastTokenRegistered = await prisma.tokens.findMany({
        orderBy: {
            created_at: 'desc',
        },
        take: 1,
    });

    const token: AxiosResponse<RefreshToken> = await axios.post('https://api.mercadolibre.com/oauth/token', {
        grant_type: 'refresh_token',
        client_id: env.MERCADO_LIVRE_APP_ID,
        client_secret: env.MERCADO_LIVRE_SECRET_KEY,
        refresh_token: getTheLastTokenRegistered[0].refresh_token,
    });

    await prisma.tokens.create({
        data: {
            access_token: token.data.access_token,
            refresh_token: token.data.refresh_token,
        },
    });

    return token;
}
