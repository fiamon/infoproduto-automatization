import { Request, Response } from 'express';
import app from './app';
import { env } from './env';

app.get('/', (req: Request, res: Response) => {
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send('...').status(200);
});

app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
});
