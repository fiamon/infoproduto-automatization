import { PrismaClient } from '@prisma/client';
import { MercadoLivreNotification, Order } from '../@types';
import axios from 'axios';
import { updateMercadoLivreRefreshToken } from './refresh-token';

const prisma = new PrismaClient();

export class NotificationsService {
    async handleRequest(body: MercadoLivreNotification) {
        const token = await prisma.tokens.findMany({
            orderBy: {
                created_at: 'desc',
            },
            take: 1,
        });

        const order: Order = await axios.get(`https://api.mercadolibre.com/${body.resource}`, {
            headers: {
                Authorization: `Bearer ${token[0].access_token}`,
            },
        });

        if (!order) {
            await updateMercadoLivreRefreshToken();
        }

        if (!order.pack_id) {
            order.pack_id = order.id;
        }

        this.messageSenderHandler(order, token[0].access_token);
    }

    async messageSenderHandler(order: Order, token: string) {
        async function sendMessage() {
            const message = await axios.post(
                `https://api.mercadolibre.com/messages/packs/${order.pack_id}/sellers/${order.buyer.id}?tag=post_sale`,
                {
                    from: {
                        user_id: order.seller.id,
                    },
                    to: {
                        user_id: order.buyer.id,
                    },
                    text: `Olá, ${order.buyer.first_name}. Agradecemos pela compra! Entraremos em contato para realizar o envio do produto.`,
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
