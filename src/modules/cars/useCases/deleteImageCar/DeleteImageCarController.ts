import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteImageCarUseCase } from './DeleteImageCarUseCase';

class DeleteImageCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteImageCarUseCase = container.resolve(DeleteImageCarUseCase);

    await deleteImageCarUseCase.execute(id);

    return response.status(200).send();
  }
}

export { DeleteImageCarController };
