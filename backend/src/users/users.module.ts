import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmExModule } from '../typeorm/typeorm-ex.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [UsersController],
  // users 안에서 사용하기 위한 provider
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
