import { Request, Response } from 'express';

export default class HealthController {
    async healthValidator(req: Request, res: Response) {
        res.sendStatus(200);
    }
}
