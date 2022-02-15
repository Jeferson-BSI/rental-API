import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { IUserRepository } from '../../repositories/IUserRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUserCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let userRepository: IUserRepository;
let athenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Athenticate user', () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    athenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should be to athenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'test',
      email: 'test@gmail.com',
      driver_license: '090349045',
      password: '1234',
      isAdmin: false,
    };
    await createUserUseCase.execute(user);
    const result = await athenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be to authenticate an nonexistent user', () => {
    expect(async () => {
      await athenticateUserUseCase.execute({
        email: 'false@gmail.com',
        password: '1253',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be to authenticate with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'test',
        email: 'test@gmail.com',
        driver_license: '090349045',
        password: '1234',
        isAdmin: false,
      };

      await createUserUseCase.execute(user);

      await athenticateUserUseCase.execute({
        email: user.email,
        password: '17729',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
