import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
  async create(@Body() createProblemDto: CreateProblemDto) {
    const simpleProblemDto = await this.problemService.create(createProblemDto);
    return {
      statusCode:
        simpleProblemDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
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
  async findAll() {
    const simpleProblemDtos = await this.problemService.findAll();
    return {
      statusCode: HttpStatus.OK,
      ...simpleProblemDtos,
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
    const simpleProblemDto = await this.problemService.findProblem(+problemId);
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
  async update(
    @Param(
      'problemId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    problemId: number,
    @Body() updateProblemDto: UpdateProblemDto,
  ) {
    const simpleProblemDto = await this.problemService.update(
      +problemId,
      updateProblemDto,
    );

    return {
      statusCode:
        simpleProblemDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleProblemDto,
    };
  }

  @Delete(':id')
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
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: number,
  ) {
    const simpleProblemDto = await this.problemService.remove(+id);
    return {
      statusCode:
        simpleProblemDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleProblemDto,
    };
  }
}
