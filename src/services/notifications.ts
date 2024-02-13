import { PrismaClient, Tokens } from '@prisma/client';
import { MercadoLivreNotification, Order } from '../@types';
import axios, { AxiosResponse } from 'axios';
import { updateMercadoLivreRefreshToken } from './refresh-token';

const prisma = new PrismaClient();

export class NotificationsService {
    private async getToken(): Promise<Tokens> {
        const token = await prisma.tokens.findMany({
            orderBy: {
                created_at: 'desc',
            },
            take: 1,
        });

        return token[0];
    }

    private async getOrder(token: Tokens, { body }: MercadoLivreNotification): Promise<Order | undefined> {
        try {
            const order: AxiosResponse<Order> = await axios.get(
                `https://api.mercadolibre.com/${body.resource}`,
                {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    },
                },
            );

            if (!order.data.pack_id) {
                order.data.pack_id = order.data.id;
            }

            return order.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.message === 'access_token is required') {
                    await updateMercadoLivreRefreshToken();
                } else {
                    console.error('Axios Error: ', error);
                }
            } else {
                console.log('Error: ', error);
            }
        }
    }

    async handleRequest(body: MercadoLivreNotification): Promise<void> {
        const token = await this.getToken();

        const order = await this.getOrder(token, body);

        if (!order) {
            return;
        }

        await this.messageSenderHandler(order, token);
    }

    private async messageSenderHandler(order: Order, token: Tokens) {
        async function sendMessage() {
            const message = await fetch(
                `https://api.mercadolibre.com/messages/action_guide/packs/${order.pack_id}/option?tag=post_sale`,
                {
                    method: 'post',
                    body: JSON.stringify({
                        option_id: 'OTHER',
                        text: 'Obrigado por realizar a compra na nossa loja. Entraremos em contato para enviar o produto',
                    }),
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    },
                },
            );

            return message;
        }

        sendMessage();
    }
}
