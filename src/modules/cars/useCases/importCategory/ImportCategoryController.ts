import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './importCategoryUseCase';

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const importCategoryUsecase = container.resolve(ImportCategoryUseCase);

    await importCategoryUsecase.execute(file);

    return response.status(201).send();
  }
}

export { ImportCategoryController };
