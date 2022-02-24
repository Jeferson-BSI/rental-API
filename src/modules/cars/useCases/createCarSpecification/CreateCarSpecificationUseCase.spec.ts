import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: ICarsRepository;
let specificationsRepositoryInMemory: ISpecificationRepository;

describe('create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('Should not be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      const car_id = '3123';
      const specification_id = ['32423'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specification_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-68867',
      fine_amount: 60,
      brand: 'car_brand',
      category_id: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'SVU',
      description: 'carro esportivo',
    });

    const specification_id = [specification.id];

    const specificationCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });

    expect(specificationCar).toHaveProperty('specifications');
    expect(specificationCar.specifications.length).toBe(1);
  });
});
