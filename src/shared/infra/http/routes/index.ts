import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './Categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalsRoutes } from './rentals.routes';
import { specificationsRoutes } from './Specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/cars', carsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/rentals', rentalsRoutes);
router.use('/users', usersRoutes);
router.use('/password', passwordRoutes);
router.use(authenticateRoutes);

export { router };
