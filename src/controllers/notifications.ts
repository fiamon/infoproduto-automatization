import { Request, Response } from 'express';

export default class NotificationsController {
    receive(req: Request, res: Response): void {
        res.status(200);
    }
}
