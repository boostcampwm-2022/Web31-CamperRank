import { Module } from '@nestjs/common';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { TypeOrmExModule } from '../typeorm/typeorm-ex.module';
import { UserRepository } from '../users/user.repository';
import { SolvedRepository } from '../solved/solved.repository';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User, Solved]),
    TypeOrmExModule.forCustomRepository([UserRepository, SolvedRepository]),
  ],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}
