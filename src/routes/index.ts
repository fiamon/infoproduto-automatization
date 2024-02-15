import { Router } from 'express';
import notificationRoutes from './notifications';
import healthRoute from './health';

export const routes = Router();

routes.use('/notification', notificationRoutes);
routes.use('/health', healthRoute);
