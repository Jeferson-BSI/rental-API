import { Response, Request, NextFunction } from 'express';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't Admin!");
  }

  return next();
}
