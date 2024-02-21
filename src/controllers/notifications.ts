import { Request, Response } from 'express';
import axios from 'axios';
import { NotificationsService } from '../services/notifications';
import { z } from 'zod';

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

        console.log('[sending request no /handle] -> ', req.body);

        const response = await axios.post('https://infoprodutos.onrender.com/notification/handle', {
            body: req.body,
        });

        if (response.status >= 400) {
            return res.sendStatus(400);
        }

        return res.sendStatus(200);
    }

    async handleTheRequestFromMercadoLivre(req: Request, res: Response): Promise<Response> {
        console.log('[request received] -> ', req.body);
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

        const isBodySchema = bodySchema.safeParse(req.body.body);
        if (!isBodySchema.success) {
            return res.sendStatus(400);
        }

        await notificationsService.handleRequest(req.body);
        return res.sendStatus(200);
    }
}
