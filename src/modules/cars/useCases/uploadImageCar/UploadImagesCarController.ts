import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadImagesCarUseCase } from './UploadImagesCarUseCase';

interface IFiles {
  filename: string;
}

class UploadImagesCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const images_name = images.map((file) => file.filename);

    const uploadImageCarUseCase = container.resolve(UploadImagesCarUseCase);

    await uploadImageCarUseCase.execute({
      car_id: id,
      images_name,
    });
    return response.status(201).send();
  }
}

export { UploadImagesCarController };
