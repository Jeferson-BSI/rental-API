import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { IUserRepository } from '../../repositories/IUserRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUserCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let userRepository: IUserRepository;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let dataProvider: DayjsDateProvider;

describe('Authenticate user', () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dataProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepository,
      usersTokensRepositoryInMemory,
      dataProvider
    );

    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should be to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'test',
      email: 'test@gmail.com',
      driver_license: '090349045',
      password: '1234',
      isAdmin: false,
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@gmail.com',
        password: '1253',
      })
    ).rejects.toEqual(new AppError('email or password is incorrect'));
  });
  it('should not be to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      name: 'test',
      email: 'test@gmail.com',
      driver_license: '0904645645',
      password: '1234',
      isAdmin: false,
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: '17729',
      })
    ).rejects.toEqual(new AppError('email or password is incorrect'));
  });
});
