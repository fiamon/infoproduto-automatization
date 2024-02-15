import { Router } from 'express';
import HealthController from '../controllers/health';

const healthRoute = Router();
const healthController = new HealthController();

healthRoute.get('/', healthController.healthValidator);

export default healthRoute;
