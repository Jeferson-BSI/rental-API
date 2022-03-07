import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepository.create({
      name: 'Car!',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-688',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });
    const car2 = await carsRepository.create({
      name: 'Car2',
      description: 'Description Car2',
      daily_rate: 100,
      license_plate: 'ABC-688672',
      fine_amount: 60,
      brand: 'car_brand2',
      category_id: 'category2',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car, car2]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepository.create({
      name: 'Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-68867',
      fine_amount: 60,
      brand: 'car_brand',
      category_id: 'category',
    });

    await carsRepository.create({
      name: 'Car2',
      description: 'Description Car2',
      daily_rate: 100,
      license_plate: 'ABC-688672',
      fine_amount: 60,
      brand: 'car_brand2',
      category_id: 'category2',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'car_brand',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepository.create({
      name: 'Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-688',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    await carsRepository.create({
      name: 'Car2',
      description: 'Description Car2',
      daily_rate: 100,
      license_plate: 'ABC-688672',
      fine_amount: 60,
      brand: 'car_brand2',
      category_id: 'category2',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category_Id', async () => {
    const car = await carsRepository.create({
      name: 'Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-688',
      fine_amount: 60,
      brand: 'brand',
      category_id: '1234',
    });

    await carsRepository.create({
      name: 'Car2',
      description: 'Description Car2',
      daily_rate: 100,
      license_plate: 'ABC-688672',
      fine_amount: 60,
      brand: 'car_brand2',
      category_id: '12233456789',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '1234',
    });

    expect(cars).toEqual([car]);
  });
});
