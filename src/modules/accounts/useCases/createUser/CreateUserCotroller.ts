import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUserCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license, isAdmin } = request.body;
    const createUserUsecase = container.resolve(CreateUserUseCase);

    await createUserUsecase.execute({
      name,
      password,
      email,
      driver_license,
    });

    return response.status(200).send();
  }
}

export { CreateUserController };
