import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('email or password is incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('email or password is incorrect');
    }

    const token = sign({}, '1a2e602adb747b6dada089379411475a', {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
