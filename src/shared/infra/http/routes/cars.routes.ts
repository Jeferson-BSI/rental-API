import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { DeleteImageCarCotroller } from '@modules/cars/useCases/deleteImageCar/DeleteImageCarCotroller';
import { ListAvailableCarsController } from '@modules/cars/useCases/listCars.ts/ListAvailableCarsCotroller';
import { UploadImagesCarController } from '@modules/cars/useCases/uploadImageCar/UploadImagesCarController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const carsRoutes = Router();

const upload = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadImagesCarController = new UploadImagesCarController();
const deleteImageCarCotroller = new DeleteImageCarCotroller();

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
  '/image/:id',
  ensureAuthenticate,
  ensureAdmin,
  upload.array('images'),
  uploadImagesCarController.handle
);

carsRoutes.delete(
  '/image/:id',
  ensureAuthenticate,
  ensureAdmin,
  deleteImageCarCotroller.hendle
);

export { carsRoutes };
