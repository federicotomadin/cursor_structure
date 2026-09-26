import { Email, User, UserRepository } from '@app/domain';
import { ConflictError } from '../../common/errors';
import { IdGenerator } from '../../ports/id-generator.port';
import { CreateUserInput, toUserDto, UserDto } from '../dtos/user.dto';

export class CreateUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly ids: IdGenerator,
  ) {}

  async execute(input: CreateUserInput): Promise<UserDto> {
    const existing = await this.users.findByEmail(Email.create(input.email));
    if (existing) {
      throw new ConflictError(`A user with email ${input.email} already exists`);
    }

    const user = User.create({ id: this.ids.generate(), name: input.name, email: input.email });
    await this.users.save(user);
    return toUserDto(user);
  }
}
