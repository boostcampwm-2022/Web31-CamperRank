import { Injectable } from '@nestjs/common';
import { SimpleRankDto } from './dto/simple-rank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solved } from '../solved/entities/solved.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Solved)
    private readonly solvedRepository: Repository<Solved>,
  ) {}

  async getUserRanks(skip: number, take: number) {
    const solvedList = await this.solvedRepository
      .createQueryBuilder('solved')
      .select('solved.user.id as userId')
      .addSelect('COUNT(DISTINCT(solved.problem.id)) AS solvedCount')
      .groupBy('solved.user.id')
      .skip(skip && take ? skip : undefined)
      .take(skip && take ? skip : undefined)
      .getRawMany();

    return solvedList.map((value) => {
      return new SimpleRankDto(value.userId, value.solvedCount);
    });
  }
}
