import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleProblemDto } from './dto/simple-problem.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('problem')
@ApiTags('문제 API')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '문제 추가 API',
    description: '문제를 추가한다.',
  })
  @ApiResponse({
    description: '문제 제목, 레벨, 문제 내용을 입력받아 문제를 저장한다.',
    status: HttpStatus.CREATED,
    type: SimpleProblemDto,
  })
  @UsePipes(ValidationPipe)
  async create(@Body() createProblemDto: CreateProblemDto) {
    const simpleProblemDto = await this.problemService.create(createProblemDto);

    return { ...simpleProblemDto };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
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

    return { ...simpleProblemDtoList };
  }

  @Get('random')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '문제 정보 제공 API',
    description: '문제 정보를 제공한다.',
  })
  @Header('Cache-Control', 'public, max-age=86400')
  @ApiResponse({
    description:
      '문제 식별 아이디를 이용해 찾은 문제를 문제 제목, 레벨, 문제 내용을 담아 반환한다.',
    status: HttpStatus.OK,
    type: SimpleProblemDto,
  })
  async findRandomProblem(@Query('loginId') loginId: string) {
    const simpleProblemDtoList = await this.problemService.findAllProblems({
      loginId,
      isRandom: true,
      skip: 0,
      take: 6,
    });

    return { ...simpleProblemDtoList };
  }

  @Get(':problemId')
  @HttpCode(HttpStatus.OK)
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

    if (simpleProblemDto !== null) {
      return { ...simpleProblemDto };
    } else {
      throw new HttpException('문제를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':problemId')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
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

    if (simpleProblemDto !== null) {
      return { ...simpleProblemDto };
    } else {
      throw new HttpException('문제를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':problemId')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
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

    if (simpleProblemDto !== null) {
      return { ...simpleProblemDto };
    } else {
      throw new HttpException('문제를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
    }
  }
}
