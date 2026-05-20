import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Bcrypt } from '../auth/bcrypt/bcrypt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, Bcrypt],
  exports: [UsersService],
})
export class UsersModule {}
