import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { AppError } from '../../../../shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it('should be able to create a new Car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-688',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category_id',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Name Car',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'ABC-688',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category_id',
      });
      await createCarUseCase.execute({
        name: 'Name Car',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'ABC-688',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category_id',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-688',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category_id',
    });

    expect(car.available).toBe(true);
  });
});
