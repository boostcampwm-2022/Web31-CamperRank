import { Injectable } from '@nestjs/common';
import { SimpleRankDto } from './dto/simple-rank.dto';
import { UserRepository } from '../users/user.repository';
import { SolvedRepository } from '../solved/solved.repository';

@Injectable()
export class RankService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly solvedRepository: SolvedRepository,
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
