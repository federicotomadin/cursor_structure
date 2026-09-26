import { Module } from '@nestjs/common';
import {
  CreateUserUseCase,
  GetUserByIdUseCase,
  ID_GENERATOR,
  IdGenerator,
  USER_REPOSITORY,
} from '@app/application';
import { UserRepository } from '@app/domain';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (users: UserRepository, ids: IdGenerator) => new CreateUserUseCase(users, ids),
      inject: [USER_REPOSITORY, ID_GENERATOR],
    },
    {
      provide: GetUserByIdUseCase,
      useFactory: (users: UserRepository) => new GetUserByIdUseCase(users),
      inject: [USER_REPOSITORY],
    },
  ],
})
export class UsersModule {}
