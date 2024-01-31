import { Router } from 'express';
import NotificationsController from '../controllers/notifications';

const notificationRoutes = Router();
const notificationsController = new NotificationsController();

notificationRoutes.post('/', notificationsController.receiveTheRequestFromMercadoLivre);
notificationRoutes.post('/handle', notificationsController.handleTheRequestFromMercadoLivre);

export default notificationRoutes;
