import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteImageCarUseCase } from './DeleteImageCarUseCase';

class DeleteImageCarCotroller {
  async hendle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteImageCarUseCase = container.resolve(DeleteImageCarUseCase);

    await deleteImageCarUseCase.execute(id);

    return response.status(200).send();
  }
}

export { DeleteImageCarCotroller };
