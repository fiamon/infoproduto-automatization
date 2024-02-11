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

    private async getOrder(token: Tokens, { body }: MercadoLivreNotification): Promise<Order> {
        const order: AxiosResponse<Order> = await axios.get(`https://api.mercadolibre.com/${body.resource}`, {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        });

        return order.data;
    }

    async handleRequest(body: MercadoLivreNotification) {
        let token = await this.getToken();

        let order = await this.getOrder(token, body);

        if (!order) {
            try {
                console.log(order);
                await updateMercadoLivreRefreshToken();
                token = await this.getToken();
                order = await this.getOrder(token, body);
            } catch (error) {
                console.error(error);
            }
        }

        if (!order.pack_id) {
            order.pack_id = order.id;
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
