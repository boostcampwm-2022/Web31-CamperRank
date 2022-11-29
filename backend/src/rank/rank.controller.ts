import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { RankService } from './rank.service';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get()
  async getUserRank(@Query('skip') skip: number, @Query('take') take: number) {
    const simpleRankDtos = await this.rankService.getUserRanks(skip, take);
    return {
      statusCode: HttpStatus.OK,
      ...simpleRankDtos,
    };
  }
}
