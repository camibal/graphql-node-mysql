import { Router } from 'express';
import auth from './auth';
import cities from './cities';
import teams from './teams';

const routes = Router();

routes.use('/auth', auth);
routes.use('/cities', cities);
routes.use('/teams', teams);

export default routes;
