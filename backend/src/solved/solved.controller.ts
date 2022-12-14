import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpException,
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
import * as process from 'process';
import { ProgrammingLanguage } from './entities/ProgrammingLanguage.enum';

@Controller('solved')
@ApiTags('답안 제출 기록 관련 API')
export class SolvedController {
  constructor(
    private readonly solvedService: SolvedService,
    private readonly httpService: HttpService, // @InjectQueue('gradeQueue') private gradeQueue: Queue,
  ) {}

  async createToGrade(createSolvedDto: CreateSolvedDto, skip, take, saveFlag) {
    const gradeSolvedDtoList = await this.solvedService.createToGrade({
      createSolvedDto,
      skip,
      take,
      saveFlag,
    });

    if (gradeSolvedDtoList === null) {
      throw new HttpException(
        '사용자 또는 문제를 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return gradeSolvedDtoList;
  }

  checkSolvedResult(gradeResultList: any) {
    const failList = gradeResultList.filter((value) => {
      return value?.resultCode && value.resultCode !== 1000;
    });

    return failList.length === 0 ? SolvedResult.Success : SolvedResult.Fail;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '문제 답안 제출 기록 생성 API',
    description: '문제 답안 제출 기록을 생성한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 아이디, 사용자 식별 아이디, 문제 코드, 정답 결과를 담아 저장한다.',
    status: HttpStatus.CREATED,
    type: SimpleSolvedDto,
  })
  @UsePipes(ValidationPipe)
  async gradeByLocalSever(@Body() createSolvedDto: CreateSolvedDto) {
    const gradeSolvedDtoList = await this.createToGrade(
      createSolvedDto,
      0,
      1000,
      true,
    );

    // await Promise.all(
    //   gradeSolvedDtoList.map(async (value) => {
    //     await this.gradeQueue.add('grade', { ...value });
    //     // const temp = await this.gradeService.addJob();
    //     // console.log(temp);
    //   }),
    // );

    const gradeResultList = await Promise.all(
      gradeSolvedDtoList.map(async (value) => {
        // await this.gradeQueue.add('grade', { foo: 'bar' });
        return this.httpService.axiosRef
          .post(process.env.GRADING_SERVER_URL, { ...value })
          .then((response) => response.data)
          .catch((err) => {
            console.error(err);
          });
      }),
    );

    const solvedResult = this.checkSolvedResult(gradeResultList);

    const gradeResultDTO = gradeResultList.map((value) => {
      return new GradeResultSolvedDto(value);
    });

    await this.solvedService.updateResult(
      gradeResultList[0].solvedId,
      solvedResult,
    );

    return {
      solvedId: gradeResultList[0].solvedId,
      solvedResult: solvedResult,
      ...gradeResultDTO,
    };
  }

  @Post('test-case')
  @HttpCode(HttpStatus.OK)
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
    const gradeSolvedDtoList = await this.createToGrade(
      createSolvedDto,
      0,
      3,
      false,
    );

    const gradeResultList = await Promise.all(
      gradeSolvedDtoList.map((value) => {
        return this.httpService.axiosRef
          .post(process.env.GRADING_SERVER_URL, { ...value })
          .then((response) => response.data)
          .catch((err) => {
            console.error(err);
          });
      }),
    );

    return { ...gradeResultList };
  }

  getServerlessURLByPL(language: ProgrammingLanguage) {
    switch (language.toLowerCase()) {
      case 'javascript':
        return process.env.SERVERLESS_GRADE_JAVASCRIPT;
      case 'python':
        return process.env.SERVERLESS_GRADE_PYTHON;
      default:
        return null;
    }
  }

  @Post('NCP-cloud-functions')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '문제 답안 제출 기록 생성 API',
    description: '문제 답안 제출 기록을 생성한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 아이디, 사용자 식별 아이디, 문제 코드, 정답 결과를 담아 저장한다.',
    status: HttpStatus.CREATED,
    type: SimpleSolvedDto,
  })
  @UsePipes(ValidationPipe)
  async createSolvedRecordWithCloudFunctions(
    @Body() createSolvedDto: CreateSolvedDto,
  ) {
    const gradeSolvedDtoList = await this.createToGrade(
      createSolvedDto,
      0,
      1000,
      true,
    );

    const gradeResultList = await Promise.all(
      gradeSolvedDtoList.map((value) => {
        return this.httpService.axiosRef
          .post(
            `${this.getServerlessURLByPL(
              createSolvedDto.language,
            )}?blocking=true&result=true`,
            { ...value },
          )
          .then((response) => response.data)
          .catch((err) => {
            console.error(err);
          });
      }),
    );

    const gradeResultDTO = gradeResultList.map((value) => {
      return new GradeResultSolvedDto(value);
    });

    const solvedResult = this.checkSolvedResult(gradeResultList);

    await this.solvedService.updateResult(
      gradeResultList[0].solvedId,
      solvedResult,
    );

    return {
      solvedId: gradeResultList[0].solvedId,
      solvedResult: solvedResult,
      ...gradeResultDTO,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
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
      throw new HttpException(
        '사용자 또는 문제를 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const simpleSolvedDtoList = await this.solvedService.findSolvedByOption({
      problemId,
      loginId,
      skip,
      take,
    });

    return { ...simpleSolvedDtoList };
  }

  @Patch(':solvedId')
  @HttpCode(HttpStatus.OK)
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

    if (simpleSolvedDto !== null) {
      return { ...simpleSolvedDto };
    } else {
      throw new HttpException(
        '문제 풀이 기록을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':solvedId')
  @HttpCode(HttpStatus.OK)
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

    if (simpleSolvedDto !== null) {
      return { ...simpleSolvedDto };
    } else {
      throw new HttpException(
        '문제 풀이 기록을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
