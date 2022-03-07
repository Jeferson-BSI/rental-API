import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: IRentalsRepository;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand_test',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12323',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
  });

  it('Should not be able to rent a car that has already been rented', async () => {
    await rentalsRepository.create({
      car_id: 'test',
      user_id: 'xxxx-xx',
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: 'test',
        user_id: '324238479283748',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is not available!'));
  });

  it('Should not be possible for a user to rent more than one car', async () => {
    await rentalsRepository.create({
      car_id: '1111',
      user_id: 'xxxx-xx',
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '2222',
        user_id: 'xxxx-xx',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it('Should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '3333',
        user_id: 'xxxx-xx',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
