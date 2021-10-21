import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService,
  ],
  exports: [UserService, ...userProviders],
})
export class UsersModule {}
