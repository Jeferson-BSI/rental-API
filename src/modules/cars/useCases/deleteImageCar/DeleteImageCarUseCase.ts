import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { AppError } from '@shared/errors/AppError';
import { deleteFIle } from '@utils/file';

@injectable()
class DeleteImageCarUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository
  ) {}
  async execute(id: string): Promise<void> {
    const imageExists = await this.carsImagesRepository.findById(id);

    if (!imageExists) {
      throw new AppError('Image does not exists!', 400);
    }

    const image = await this.carsImagesRepository.deleteImag(id);

    if (image) {
      deleteFIle(`./tmp/cars/${imageExists.image_name}`);
    }
  }
}

export { DeleteImageCarUseCase };
