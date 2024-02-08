import { Request, Response } from 'express';
import axios from 'axios';
import { NotificationsService } from '../services/notifications';

const notificationsService = new NotificationsService();

export default class NotificationsController {
    async receiveTheRequestFromMercadoLivre(req: Request, res: Response): Promise<Response> {
        if (req.body.topic !== 'orders_v2') {
            return res.sendStatus(200);
        }

        const response = await axios.post('http://localhost:8080/notification/handle', {
            body: req.body,
        });

        if (response.status !== 200) {
            return res.status(500);
        }

        return res.sendStatus(200);
    }

    async handleTheRequestFromMercadoLivre(req: Request, res: Response): Promise<void> {
        res.status(200).send('ok');
        await notificationsService.handleRequest(req.body);
    }
}
