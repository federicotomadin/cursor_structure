import { Global, Module } from '@nestjs/common';
import { ID_GENERATOR, USER_REPOSITORY } from '@app/application';
import { InMemoryUserRepository } from './persistence/in-memory/in-memory-user.repository';
import { UuidIdGenerator } from './services/uuid-id-generator';

@Global()
@Module({
  providers: [
    { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
    { provide: ID_GENERATOR, useClass: UuidIdGenerator },
  ],
  exports: [USER_REPOSITORY, ID_GENERATOR],
})
export class InfrastructureModule {}
