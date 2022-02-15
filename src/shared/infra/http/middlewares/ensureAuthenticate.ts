import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export default function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '1a2e602adb747b6dada089379411475a'
    ) as IPayload;

    const userRepository = new UserRepository();
    const user = userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist!', 401);
    }

    request.user = {
      id: user_id,
    };
    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
