import { container } from 'tsyringe';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
