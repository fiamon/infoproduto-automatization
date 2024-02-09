import { Router } from 'express';
import notificationRoutes from './notifications';

export const routes = Router();

routes.use('/notification', notificationRoutes);
