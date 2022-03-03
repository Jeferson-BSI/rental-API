import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRentalUseCase/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticate, createRentalController.handle);

rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthenticate,
  devolutionRentalController.handle
);

rentalsRoutes.get(
  '/user',
  ensureAuthenticate,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
