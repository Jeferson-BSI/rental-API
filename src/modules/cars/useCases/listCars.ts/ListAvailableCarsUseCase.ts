import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ name, category_id, brand }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable(brand, category_id, name);

    return cars;
  }
}

export { ListAvailableCarsUseCase };
