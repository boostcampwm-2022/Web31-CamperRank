import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SolvedService } from './solved.service';
import { CreateSolvedDto } from './dto/create-solved.dto';
import { UpdateSolvedDto } from './dto/update-solved.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleSolvedDto } from './dto/simple-solved.dto';
import { HttpService } from '@nestjs/axios';
import { SolvedResult } from './entities/SolvedResult.enum';

@Controller('solved')
@ApiTags('답안 제출 기록 관련 API')
export class SolvedController {
  constructor(
    private readonly solvedService: SolvedService,
    private readonly httpService: HttpService,
  ) {}

  @Post('test-case')
  @ApiOperation({
    summary: '문제 답안 제출 기록 생성 API',
    description: '문제 답안 제출 기록을 생성한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 아이디, 사용자 식별 아이디, 문제 코드, 정답 결과를 담아 저장한다.',
    status: HttpStatus.OK,
    type: SimpleSolvedDto,
  })
  async nonCreateJustTest(@Body() createSolvedDto: CreateSolvedDto) {
    const gradeSolvedDtos = await this.solvedService.createToTest(
      createSolvedDto,
    );

    const results = await Promise.all(
      gradeSolvedDtos.map((value) => {
        return this.httpService.axiosRef
          .post(process.env.GRADING_SERVER_URL, { data: value })
          .then((response) => response.data)
          .catch((err) => {
            console.error(err);
          });
      }),
    );

    return {
      statusCode: HttpStatus.OK,
      ...results,
    };
  }

  @Post()
  @ApiOperation({
    summary: '문제 답안 제출 기록 생성 API',
    description: '문제 답안 제출 기록을 생성한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 아이디, 사용자 식별 아이디, 문제 코드, 정답 결과를 담아 저장한다.',
    status: HttpStatus.OK,
    type: SimpleSolvedDto,
  })
  async create(@Body() createSolvedDto: CreateSolvedDto) {
    const gradeSolvedDtos = await this.solvedService.createToGrade(
      createSolvedDto,
    );

    const results = await Promise.all(
      gradeSolvedDtos.map((value) => {
        return this.httpService.axiosRef
          .post(process.env.GRADING_SERVER_URL, {
            data: value,
          })
          .then((response) => response.data)
          .catch((err) => {
            console.error(err);
          });
      }),
    );

    const failList = results.filter((value) => {
      return value.resultCode !== 1000;
    });

    return await this.solvedService.updateResult(
      results[0].solvedId,
      failList.length === 0 ? SolvedResult.Success : SolvedResult.Fail,
    );
  }

  @Get()
  @ApiOperation({
    summary: '문제 답안 제출 기록 조회 API',
    description: '문제 답안 제출 기록을 조회한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 아이디 또는 사용자 식별 아이디를 이용하여 문제 답안 제출 기록을 조회한다.',
    status: HttpStatus.OK,
    type: SimpleSolvedDto,
  })
  async findProblemByProblemIdOrUserId(
    @Query('problemId') problemId: string,
    @Query('userId') userId: string,
  ) {
    const simpleSolvedDtos = await this.solvedService.findSolvedByOpt({
      problemId,
      userId,
    });
    return {
      statusCode: HttpStatus.OK,
      ...simpleSolvedDtos,
    };
  }

  @Patch(':solvedId')
  @ApiOperation({
    summary: '문제 답안 제출 기록 수정 API',
    description: '답안 제출 이후에 채점이 완료되면 상태를 변경한다..',
  })
  @ApiResponse({
    description: '문제 식별 아이디를 이용하여 문제 답안 제출 기록을 수정한다.',
    status: HttpStatus.OK,
    type: SimpleSolvedDto,
  })
  async update(
    @Param('solvedId') solvedId: string,
    @Body() updateSolvedDto: UpdateSolvedDto,
  ) {
    const simpleSolvedDto = await this.solvedService.update(
      +solvedId,
      updateSolvedDto,
    );
    return {
      statusCode:
        simpleSolvedDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleSolvedDto,
    };
  }

  @Delete(':solvedId')
  @ApiOperation({
    summary: '문제 답안 제출 기록 삭제 API',
    description: '문제 답안 제출 기록을 삭제한다.',
  })
  @ApiResponse({
    description: '문제 식별 아이디를 이용하여 문제 답안 제출 기록을 삭제한다.',
    status: HttpStatus.OK,
    type: SimpleSolvedDto,
  })
  async remove(@Param('solvedId') solvedId: string) {
    const simpleSolvedDto = await this.solvedService.remove(+solvedId);
    return {
      statusCode:
        simpleSolvedDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleSolvedDto,
    };
  }
}
