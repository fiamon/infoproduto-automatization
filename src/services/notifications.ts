import { PrismaClient } from '@prisma/client';
import { MercadoLivreNotification, Order } from '../@types';
import axios from 'axios';

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
                Authorization: `Bearer ${token}`,
            },
        });

        if (!order.pack_id) {
            order.pack_id = order.id;
        }

        async function sendMessage() {
            await axios.post(
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
        }
        sendMessage();
    }
}
