import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { RankService } from './rank.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SimpleRankDto } from './dto/simple-rank.dto';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저 랭킹 API',
    description: '유저들을 랭킹 순으로 반환한다.',
  })
  @ApiResponse({
    description:
      'skip, take 를 받아서 페이징을 이용하여 받을 수 있고, 없다면 전체 사용자를 응답으로 보내준다.',
    status: HttpStatus.OK,
    type: SimpleRankDto,
  })
  async getUserRank(
    @Query('skip', new DefaultValuePipe(0))
    skip: number,
    @Query('take', new DefaultValuePipe(1000))
    take: number,
  ) {
    const simpleRankDtoList = await this.rankService.getUserRanks(skip, take);

    // TODO: simpleRankDtoList의 크기가 0일 때 status 어떻게 보낼지 결정
    return { ...simpleRankDtoList };
  }
}
