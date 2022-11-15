import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmExModule } from '../typeorm/typeorm-ex.module';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmExModule.forCustomRepository([UsersRepository]), // CustomRepository 를 사용하기 위해 추가
  ],
})
export class UsersModule {}
