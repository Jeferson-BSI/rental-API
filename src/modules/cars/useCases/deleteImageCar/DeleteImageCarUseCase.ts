import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '@shared/errors/AppError';
import { deleteFIle } from '@utils/file';

@injectable()
class DeleteImageCarUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
  async execute(id: string): Promise<void> {
    const image = await this.carsImagesRepository.findById(id);

    if (!image) {
      throw new AppError('Image does not exists!', 400);
    }

    const deleteImage = await this.carsImagesRepository.deleteImag(id);

    if (deleteImage) {
      await this.storageProvider.delete(image.image_name, 'cars');
    }
  }
}

export { DeleteImageCarUseCase };
