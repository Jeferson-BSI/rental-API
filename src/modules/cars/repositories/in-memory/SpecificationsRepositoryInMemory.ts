import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository';

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  private repository: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, { name, description });

    this.repository.push(specification);
    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.find((specification) => specification.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = this.repository.filter((specification) =>
      ids.includes(specification.id)
    );
    return specification;
  }
}

export { SpecificationsRepositoryInMemory };
