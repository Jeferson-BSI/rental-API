import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRentalUseCase/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post('/', ensureAuthenticate, createRentalController.handle);

rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthenticate,
  devolutionRentalController.handle
);

export { rentalsRoutes };
