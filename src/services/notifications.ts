import { PrismaClient, Tokens } from '@prisma/client';
import { MercadoLivreNotification, Order } from '../@types';
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

    private async getOrder(token: Tokens, { body }: MercadoLivreNotification): Promise<Order | void> {
        try {
            const orderRequestDetails = await fetch(`https://api.mercadolibre.com/${body.resource}`, {
                headers: {
                    Authorization: `Bearer ${token.access_token}`,
                },
            });

            if (orderRequestDetails.status === 403) {
                await updateMercadoLivreRefreshToken();
                return this.handleRequest({ body });
            }

            const order: Order = await orderRequestDetails.json();

            if (!order.pack_id) {
                order.pack_id = order.id;
            }

            return order;
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    async handleRequest(body: MercadoLivreNotification): Promise<void> {
        const token = await this.getToken();

        const order = await this.getOrder(token, body);

        if (!order) {
            return;
        }

        await this.messageSenderHandler(order, token, body);
    }

    private async messageSenderHandler(order: Order, token: Tokens, { body }: MercadoLivreNotification) {
        try {
            const message = await fetch(
                `https://api.mercadolibre.com/messages/action_guide/packs/${order.pack_id}/option?tag=post_sale`,
                {
                    method: 'post',
                    body: JSON.stringify({
                        option_id: 'OTHER',
                        text: `Obrigado por sua compra, me chame no WhatsApp através do número abaixo:<br><br>11998033929<br><br>QUE EU JÁ TE ENVIO O LINK PARA DOWNLOAD<br><br>att / Hallak`,
                    }),
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    },
                },
            );

            if (message.status === 403) {
                await updateMercadoLivreRefreshToken();
                return this.handleRequest({ body });
            }

            return message;
        } catch (error) {
            console.log('Error ', error);
        }
    }
}
