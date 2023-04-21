import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './shared/guards/at.guard';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, PersonModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
