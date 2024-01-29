import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { routes } from './routes';

const app: Application = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(routes);

export default app;
