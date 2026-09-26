import { UserRepository } from '@app/domain';
import { NotFoundError } from '../../common/errors';
import { toUserDto, UserDto } from '../dtos/user.dto';

export class GetUserByIdUseCase {
  constructor(private readonly users: UserRepository) {}

  async execute(id: string): Promise<UserDto> {
    const user = await this.users.findById(id);
    if (!user) {
      throw new NotFoundError(`User ${id} not found`);
    }
    return toUserDto(user);
  }
}
