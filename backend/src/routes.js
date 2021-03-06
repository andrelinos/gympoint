import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckInController from './app/controllers/CheckInController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';
import GymHelpOrderController from './app/controllers/GymHelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/students/:id/checkins', CheckInController.index);
routes.post('/students/:id/checkins', CheckInController.store);

routes.post('/enrollments', EnrollmentController.store);

routes.post('/students/:id/help-orders', StudentHelpOrderController.store);

/**
 * Only User Logged Below
 */
routes.use(authMiddleware);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.get('/help-orders', GymHelpOrderController.index);
routes.get('/students/:id/help-orders', StudentHelpOrderController.index);
routes.put('/help-orders/:id/answer', GymHelpOrderController.update);

export default routes;
