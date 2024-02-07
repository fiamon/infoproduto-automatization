import axios, { AxiosResponse } from 'axios';
import { env } from '../env';
import { PrismaClient } from '@prisma/client';
import { GetAuthorizationCodeResponse } from '../@types';

const prisma = new PrismaClient();

export async function getAuthorizationCode(userCode: string): Promise<GetAuthorizationCodeResponse> {
    const authorizationCode: AxiosResponse<GetAuthorizationCodeResponse> = await axios.post(
        'https://api.mercadolibre.com/oauth/token',
        {
            grant_type: 'authorization_code',
            client_id: env.MERCADO_LIVRE_APP_ID,
            client_secret: env.MERCADO_LIVRE_SECRET_KEY,
            code: userCode,
            redirect_uri: 'https://65b5-2804-30c-b2a-3100-30ee-4655-b78b-8aa6.ngrok-free.app',
            code_verifier: '$CODE_VERIFIER',
        },
    );

    await prisma.tokens.create({
        data: {
            access_token: authorizationCode.data.access_token,
            refresh_token: authorizationCode.data.refresh_token,
        },
    });

    console.log(authorizationCode);
    return authorizationCode.data;
}

export async function updateMercadoLivreRefreshToken() {
    const refreshToken = prisma.tokens.findMany({
        orderBy: {
            created_at: 'desc',
        },
        take: 1,
    });

    const token = await axios.post('https://api.mercadolibre.com/oauth/token', {
        grant_type: 'refresh_token',
        client_id: env.MERCADO_LIVRE_APP_ID,
        client_secret: env.MERCADO_LIVRE_SECRET_KEY,
        refresh_token: refreshToken,
    });

    await prisma.tokens.create({
        data: {
            access_token: token.data['access_token'],
            refresh_token: token.data['refresh_token'],
        },
    });

    return { token };
}
