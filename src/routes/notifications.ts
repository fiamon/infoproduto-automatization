import { Router } from 'express';
import NotificationsController from '../controllers/notifications';

const notificationRoutes = Router();
const notificationsController = new NotificationsController();

notificationRoutes.post('/', notificationsController.receive);

export default notificationRoutes;
