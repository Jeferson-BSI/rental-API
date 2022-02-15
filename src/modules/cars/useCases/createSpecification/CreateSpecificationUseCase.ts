import { inject, injectable } from 'tsyringe';

import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { AppError } from '@shared/errors/AppError';

interface ISpecificationRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: ISpecificationRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification Already exists!');
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
