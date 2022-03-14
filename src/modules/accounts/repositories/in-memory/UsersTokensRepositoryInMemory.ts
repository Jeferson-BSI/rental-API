import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private repository: UserTokens[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.repository.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.repository.find(
      (userToken) =>
        userToken.id === user_id && userToken.refresh_token === refresh_token
    );
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.repository.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.repository.find((userToken) => userToken.id === id);

    this.repository.splice(this.repository.indexOf(userToken), 1);
  }
}

export { UsersTokensRepositoryInMemory };
