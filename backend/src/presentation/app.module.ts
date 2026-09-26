import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@app/infrastructure';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [InfrastructureModule, HealthModule, UsersModule],
})
export class AppModule {}
