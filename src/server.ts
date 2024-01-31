import app from './app';
import fs from 'node:fs';
import https from 'node:https';
import { env } from './env';
import { Request, Response } from 'express';

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from express server.');
});

https
    .createServer(
        {
            key: fs.readFileSync('key.pem'),
            cert: fs.readFileSync('cert.pem'),
        },
        app,
    )
    .listen(env.PORT, () => {
        console.log(`🚀 Server running on port ${env.PORT}`);
    });
