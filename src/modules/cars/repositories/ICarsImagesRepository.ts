import { DeleteResult } from 'typeorm';

import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
  findById(id: string): Promise<CarImage>;
  deleteImag(id: string): Promise<DeleteResult>;
}

export { ICarsImagesRepository };
