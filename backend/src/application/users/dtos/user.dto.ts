import { User } from '@app/domain';

export interface UserDto {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
}

export const toUserDto = (user: User): UserDto => ({
  id: user.id,
  name: user.name,
  email: user.email.value,
  createdAt: user.createdAt.toISOString(),
});
