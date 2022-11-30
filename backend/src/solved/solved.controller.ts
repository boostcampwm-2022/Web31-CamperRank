import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SolvedService } from './solved.service';
import { CreateSolvedDto } from './dto/create-solved.dto';
import { UpdateSolvedDto } from './dto/update-solved.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleSolvedDto } from './dto/simple-solved.dto';
import { HttpService } from '@nestjs/axios';
import { SolvedResult } from './entities/SolvedResult.enum';
import { GradeResultSolvedDto } from './dto/grade-result-solved.dto';
import { isFalsy } from '../utils/boolUtils';

@Controller('solved')
@ApiTags('답안 제출 기록 관련 API')
export class SolvedController {
  constructor(
    private readonly solvedService: SolvedService,
    private readonly httpService: HttpService,
  ) {}

  /**
   * problemId, loginId, userCode, language 를 body 로 받는다.
   * solved 를 생성하지만 DB에 저장하지 않는다.
   * 따라서, solvedId 가 생성되지 않는다.
   * 테스트 케이스는 skip: 0, take: 3 으로 받아서 처리한다.
   * @param createSolvedDto
   * @Return { statusCode, Object }
   */
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
  @UsePipes(ValidationPipe)
  async nonCreateJustTest(@Body() createSolvedDto: CreateSolvedDto) {
    const gradeSolvedDtoList = await this.solvedService.createSolvedToTest(
      createSolvedDto,
    );

    const gradeResultList = await Promise.all(
      gradeSolvedDtoList.map((value) => {
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
      ...gradeResultList,
    };
  }

  /**
   * problemId, loginId, userCode, language 를 body 로 받는다.
   * solved 를 생성하고 DB에 저장한다.
   * 따라서, solvedId 가 생성되고 result 에 Ready 가 기본으로 설정된다.
   * 테스트 케이스를 이용하여 grade-server 로 넘어간다.
   * grade-server 의 결과에 따라 Ready 를 Success 또는 Fail 로 변경된다.
   * @param createSolvedDto
   * @Return { statusCode, solvedId, GradeResultSolvedDto }
   */
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
  @UsePipes(ValidationPipe)
  async createSolvedRecord(@Body() createSolvedDto: CreateSolvedDto) {
    const gradeSolvedDtoList = await this.solvedService.createToGrade(
      createSolvedDto,
    );

    const gradeResultList = await Promise.all(
      gradeSolvedDtoList.map((value) => {
        return this.httpService.axiosRef
          .post(process.env.GRADING_SERVER_URL, { data: value })
          .then((response) => response.data)
          .catch((err) => {
            console.error(err);
          });
      }),
    );

    const failList = gradeResultList.filter((value) => {
      return value.resultCode !== 1000;
    });

    const gradeResultDTO = gradeResultList.map((value) => {
      return new GradeResultSolvedDto(value);
    });

    const solvedResult =
      failList.length === 0 ? SolvedResult.Success : SolvedResult.Fail;

    await this.solvedService.updateResult(
      gradeResultList[0].solvedId,
      solvedResult,
    );

    return {
      statusCode: HttpStatus.OK,
      solvedId: gradeResultList[0].solvedId,
      solvedResult: solvedResult,
      ...gradeResultDTO,
    };
  }

  /**
   * problemId 와 loginId 를 queryString 으로 받는다.
   * problemId 와 loginId 가 모두 undefined 인 경우 Select * From solved OFFSET 0 LIMIT 1000; 쿼리가 전송된다.
   * @param problemId
   * @param loginId
   * @param skip
   * @param take
   * @return { statusCode, SimpleSolvedDto[] }
   */
  @Get()
  @ApiOperation({
    summary: '문제 답안 제출 기록 조회 API',
    description: '문제 답안 제출 기록을 조회한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 아이디 또는 사용자 식별 아이디를 이용하여 문제 답안 제출 기록을 조회한다.' +
      '만약, problemId 와 loginId가 모두 비어있다면 전체 조회가 된다.',
    status: HttpStatus.OK,
    type: SimpleSolvedDto,
  })
  async findSolvedByProblemIdOrLoginId(
    @Query('problemId') problemId: number,
    @Query('loginId') loginId: string,
    @Query('skip', new DefaultValuePipe(0)) skip: number,
    @Query('take', new DefaultValuePipe(1000)) take: number,
  ) {
    if (isFalsy(problemId) && isFalsy(loginId)) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }

    const simpleSolvedDtoList = await this.solvedService.findSolvedByOption({
      problemId,
      loginId,
      skip,
      take,
    });

    return {
      statusCode: HttpStatus.OK,
      ...simpleSolvedDtoList,
    };
  }

  /**
   * result 를 body 로 입력받는다.
   * solvedId 를 이용하여 저장된 solved 를 찾고 result 를 업데이트한다.
   * result 는 enum 타입의 SolvedResult 으로 관리된다.
   * 따라서, solvedResult 에 존재하는 값이면 대소문자와 관계업이 저장된다.
   * @param solvedId
   * @param updateSolvedDto
   * @return { statusCode, SimpleSolvedDto }
   */
  @Patch(':solvedId')
  @ApiOperation({
    summary: '문제 답안 제출 기록 수정 API',
    description: '답안 제출 이후에 채점이 완료되면 상태를 변경한다.',
  })
  @ApiResponse({
    description: '문제 식별 아이디를 이용하여 문제 답안 제출 기록을 수정한다.',
    status: HttpStatus.OK,
    type: SimpleSolvedDto,
  })
  @UsePipes(ValidationPipe)
  async update(
    @Param(
      'solvedId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    solvedId: number,
    @Body() updateSolvedDto: UpdateSolvedDto,
  ) {
    const simpleSolvedDto = await this.solvedService.update(
      solvedId,
      updateSolvedDto,
    );

    return {
      statusCode:
        simpleSolvedDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleSolvedDto,
    };
  }

  /**
   * 문제 제출 기록을 삭제한다.
   * 추후에 soft-delete 로 수정하는 것을 고려하고 있다.
   * @param solvedId
   * @return { statusCode, SimpleSolvedDto }
   */
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
  async remove(
    @Param(
      'solvedId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    solvedId: number,
  ) {
    const simpleSolvedDto = await this.solvedService.remove(solvedId);

    return {
      statusCode:
        simpleSolvedDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleSolvedDto,
    };
  }
}
