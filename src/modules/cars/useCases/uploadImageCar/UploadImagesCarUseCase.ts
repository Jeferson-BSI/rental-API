import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadImagesCarUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exists!', 400);
    }

    images_name.map(async (image_name) => {
      await this.carsImagesRepository.create(car_id, image_name);
    });
  }
}

export { UploadImagesCarUseCase };
