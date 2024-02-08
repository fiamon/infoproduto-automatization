import { Request, Response } from 'express';
import axios from 'axios';
import { NotificationsService } from '../services/notifications';

const notificationsService = new NotificationsService();

export default class NotificationsController {
    async receiveTheRequestFromMercadoLivre(req: Request, res: Response): Promise<void> {
        if (req.body.topic !== 'orders_v2') {
            res.send('ok').status(200);
        }

        const response = await axios.post('http://localhost:8080/notifications/handle', {
            body: req.body,
        });

        if (response.status !== 200) {
            res.status(500);
            return;
        }

        res.status(200).send('ok');
    }

    async handleTheRequestFromMercadoLivre(req: Request, res: Response): Promise<void> {
        res.status(200).send('ok');
        await notificationsService.handleRequest(req.body);
    }
}
