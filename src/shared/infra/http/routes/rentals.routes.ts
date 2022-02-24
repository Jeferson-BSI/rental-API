import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRentalUseCase/CreateRentalController';

import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post('/', ensureAuthenticate, createRentalController.handle);

export { rentalsRoutes };
