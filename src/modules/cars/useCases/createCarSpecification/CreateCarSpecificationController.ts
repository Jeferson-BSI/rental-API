import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specification_id } = request.body;

    const createCarSpecificationUsecase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const specificationCar = await createCarSpecificationUsecase.execute({
      car_id: id,
      specification_id,
    });

    return response.json(specificationCar);
  }
}

export { CreateCarSpecificationController };
