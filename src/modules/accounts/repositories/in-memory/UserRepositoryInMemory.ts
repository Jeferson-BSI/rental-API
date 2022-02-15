import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUserRepository } from '../IUserRepository';

class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create({
    name,
    email,
    driver_license,
    password,
    isAdmin,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      driver_license,
      password,
      isAdmin,
      created_at: new Date(),
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UserRepositoryInMemory };
