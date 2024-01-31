import { Request, Response } from 'express';

export default class NotificationsController {
    async receiveTheRequestFromMercadoLivre(req: Request, res: Response): Promise<void> {
        const response = await fetch('http://localhost:8080/notifications/handle', {
            method: 'post',
            body: JSON.stringify({
                data: req.body,
            }),
        });

        if (!response.ok) {
            res.status(500);
            return;
        }

        res.status(200).send('ok');
    }

    handleTheRequestFromMercadoLivre(req: Request, res: Response): void {
        res.send('ok');
    }
}
