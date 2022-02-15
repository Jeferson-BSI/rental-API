import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserCotroller';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export { usersRoutes };
