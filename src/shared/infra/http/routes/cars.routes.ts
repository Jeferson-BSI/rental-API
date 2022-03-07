import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { DeleteImageCarController } from '@modules/cars/useCases/deleteImageCar/DeleteImageCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listCars/ListAvailableCarsController';
import { UploadImagesCarController } from '@modules/cars/useCases/uploadImageCar/UploadImagesCarController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const carsRoutes = Router();

const upload = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadImagesCarController = new UploadImagesCarController();
const deleteImageCarController = new DeleteImageCarController();

carsRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticate,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticate,
  ensureAdmin,
  upload.array('images'),
  uploadImagesCarController.handle
);

carsRoutes.delete(
  '/images/:id',
  ensureAuthenticate,
  ensureAdmin,
  deleteImageCarController.handle
);

export { carsRoutes };
