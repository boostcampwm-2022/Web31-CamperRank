import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Solved } from '../solved/entities/solved.entity';
import { SimpleRankDto } from './dto/simple-rank.dto';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Solved) private solvedRepository: Repository<Solved>,
  ) {}

  async getUserRanks(skip: number, take: number) {
    const solvedList = await this.solvedRepository
      .createQueryBuilder('solved')
      .select('solved.user.id as userId')
      .addSelect('COUNT(DISTINCT(solved.problem.id)) AS solvedCount')
      // .addSelect('COUNT(*) AS solvedCount')
      .groupBy('solved.user.id')
      // .distinctOn(['solved.problem.id'])
      .skip(skip && take ? skip : undefined)
      .take(skip && take ? skip : undefined)
      .getRawMany();
    return solvedList.map((value) => {
      return new SimpleRankDto(value.userId, +value.solvedCount);
    });
  }
}
