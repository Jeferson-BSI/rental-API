import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './Categories.routes';
import { specificationsRoutes } from './Specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carsRoutes);
router.use(authenticateRoutes);

export { router };
