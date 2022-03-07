import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoryRepository: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    categoryRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  });
  it('Should be able to create a new category!', async () => {
    const category = {
      name: 'Category test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoryRepository.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('Should not be able to create a new category with name exists!', async () => {
    const category = {
      name: 'Category test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError('Category already exists!'));
  });
});
