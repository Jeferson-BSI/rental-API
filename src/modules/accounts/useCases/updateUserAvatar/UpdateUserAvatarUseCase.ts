import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { deleteFIle } from '@utils/file';

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({ userId, avatarFile }: IRequest) {
    const user = await this.userRepository.findById(userId);
    if (user.avatar) {
      deleteFIle(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;
    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
