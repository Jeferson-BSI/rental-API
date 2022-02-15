import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!');
    }

    await this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
