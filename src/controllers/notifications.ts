import { Request, Response } from 'express';
import axios from 'axios';
import { NotificationsService } from '../services/notifications';
import { z } from 'zod';
import { env } from '../env';

const notificationsService = new NotificationsService();

export default class NotificationsController {
    async receiveTheRequestFromMercadoLivre(req: Request, res: Response): Promise<Response> {
        const bodySchema = z.object({
            _id: z.string(),
            resource: z.string().startsWith('/orders/'),
            user_id: z.number(),
            topic: z.string().startsWith('orders_v2').endsWith('orders_v2'),
            application_id: z.number(),
            attempts: z.number(),
            sent: z.string(),
            received: z.string(),
            actions: z.array(z.string()).nonempty(),
        });

        const isBodySchema = bodySchema.safeParse(req.body);
        if (!isBodySchema.success) {
            return res.sendStatus(400);
        }

        await axios.post(
            'http://localhost:8080/notification/handle',
            {
                body: req.body,
            },
            {
                headers: {
                    Authorization: env.SECRET,
                },
            },
        );

        return res.sendStatus(200);
    }

    async handleTheRequestFromMercadoLivre(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        if (req.headers.authorization !== env.SECRET) {
            throw new Error('Invalid request');
        }
        await notificationsService.handleRequest(req.body);
        res.sendStatus(200);
    }
}
