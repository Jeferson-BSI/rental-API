import { hash } from 'bcrypt';
import { injectable, inject } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void | Error> {
    const passwordHash = await hash(password, 8);

    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError('User already exists!');
    }

    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
