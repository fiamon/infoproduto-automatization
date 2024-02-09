import { PrismaClient, Tokens } from '@prisma/client';
import { MercadoLivreNotification, Order } from '../@types';
import axios from 'axios';
import { updateMercadoLivreRefreshToken } from './refresh-token';

const prisma = new PrismaClient();

export class NotificationsService {
    private async getToken(): Promise<Tokens[]> {
        const token = await prisma.tokens.findMany({
            orderBy: {
                created_at: 'desc',
            },
            take: 1,
        });

        return token;
    }

    private async getOrder(token: Tokens[], request: MercadoLivreNotification): Promise<Order> {
        const order: Order = await axios.get(`https://api.mercadolibre.com/${request.body.resource}`, {
            headers: {
                Authorization: `Bearer ${token[0].access_token}`,
            },
        });

        return order;
    }

    async handleRequest(body: MercadoLivreNotification) {
        let token: Tokens[];
        token = await this.getToken();

        let order: Order;

        order = await axios.get(`https://api.mercadolibre.com/${body.body.resource}`, {
            headers: {
                Authorization: `Bearer ${token[0].access_token}`,
            },
        });

        if (!order) {
            await updateMercadoLivreRefreshToken();
            token = await this.getToken();
            order = await this.getOrder(token, body);
        }

        if (!order.data.pack_id) {
            order.data.pack_id = order.data.id;
        }

        this.messageSenderHandler(order, token[0].access_token);
    }

    private async messageSenderHandler(order: Order, token: string) {
        async function sendMessage() {
            const message = await axios.post(
                `https://api.mercadolibre.com/messages/packs/${order.data.pack_id}/sellers/${order.data.buyer.id}?tag=post_sale`,
                {
                    from: {
                        user_id: order.data.seller.id,
                    },
                    to: {
                        user_id: order.data.buyer.id,
                    },
                    text: `Olá, ${order.data.buyer.first_name}. Agradecemos pela compra! Entraremos em contato para realizar o envio do produto.`,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            return message;
        }

        const message = await sendMessage();

        if (message.status === 400) {
            await updateMercadoLivreRefreshToken();
            await sendMessage();
        }
    }
}
