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
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleProblemDto } from './dto/simple-problem.dto';

@Controller('problem')
@ApiTags('문제 API')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  @ApiOperation({
    summary: '문제 추가 API',
    description: '문제를 추가한다.',
  })
  @ApiResponse({
    description: '문제 제목, 레벨, 문제 내용을 입력받아 문제를 저장한다.',
    status: HttpStatus.OK,
    type: SimpleProblemDto,
  })
  @UsePipes(ValidationPipe)
  async create(@Body() createProblemDto: CreateProblemDto) {
    const simpleProblemDto = await this.problemService.create(createProblemDto);

    return {
      statusCode: HttpStatus.OK,
      ...simpleProblemDto,
    };
  }

  @Get()
  @ApiOperation({
    summary: '전체 문제 반환 API',
    description: '전체 문제를 반환한다.',
  })
  @ApiResponse({
    description: '문제 제목, 레벨, 문제 내용을 담아 리스트 형태로 반환한다.',
    status: HttpStatus.OK,
    type: SimpleProblemDto,
  })
  async findProblems(
    @Query('loginId') loginId: string,
    @Query('skip', new DefaultValuePipe(0))
    skip: number,
    @Query('take', new DefaultValuePipe(1000))
    take: number,
  ) {
    const simpleProblemDtoList = await this.problemService.findAllProblems({
      loginId,
      isRandom: false,
      skip,
      take,
    });

    return {
      statusCode: HttpStatus.OK,
      ...simpleProblemDtoList,
    };
  }

  @Get('random')
  @ApiOperation({
    summary: '문제 정보 제공 API',
    description: '문제 정보를 제공한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 아이디를 이용해 찾은 문제를 문제 제목, 레벨, 문제 내용을 담아 반환한다.',
    status: HttpStatus.OK,
    type: SimpleProblemDto,
  })
  async findRandomProblem(@Query('loginId') loginId: string) {
    const simpleProblemDto = await this.problemService.findAllProblems({
      loginId,
      isRandom: true,
    });

    return {
      statusCode: HttpStatus.OK,
      ...simpleProblemDto,
    };
  }

  @Get(':problemId')
  @ApiOperation({
    summary: '문제 정보 제공 API',
    description: '문제 정보를 제공한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 아이디를 이용해 찾은 문제를 문제 제목, 레벨, 문제 내용을 담아 반환한다.',
    status: HttpStatus.OK,
    type: SimpleProblemDto,
  })
  async findOne(
    @Param(
      'problemId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    problemId: number,
  ) {
    const simpleProblemDto = await this.problemService.findOneProblem(
      problemId,
    );

    return {
      statusCode:
        simpleProblemDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleProblemDto,
    };
  }

  @Patch(':problemId')
  @ApiOperation({
    summary: '문제 정보 수정 API',
    description: '문제 정보를 수정한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 아이디를 이용해 찾은 문제의 문제 제목, 레벨, 문제 내용을 수정한다.',
    status: HttpStatus.OK,
    type: SimpleProblemDto,
  })
  @UsePipes(ValidationPipe)
  async update(
    @Param(
      'problemId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    problemId: number,
    @Body() updateProblemDto: UpdateProblemDto,
  ) {
    const simpleProblemDto = await this.problemService.update(
      problemId,
      updateProblemDto,
    );

    return {
      statusCode:
        simpleProblemDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleProblemDto,
    };
  }

  @Delete(':problemId')
  @ApiOperation({
    summary: '문제 정보 삭제 API',
    description: '문제 정보를 삭제한다.',
  })
  @ApiResponse({
    description: '문제 식별 아이디를 이용해 찾은 문제를 삭제한다.',
    status: HttpStatus.OK,
    type: SimpleProblemDto,
  })
  async remove(
    @Param(
      'problemId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    problemId: number,
  ) {
    const simpleProblemDto = await this.problemService.remove(problemId);

    return {
      statusCode:
        simpleProblemDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleProblemDto,
    };
  }
}
