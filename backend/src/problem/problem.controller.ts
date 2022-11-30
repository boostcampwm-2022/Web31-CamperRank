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

  /**
   * title, level, description 을 body 로 입력받는다.
   * 중복 검사를 하지 않기 때문에 응답은 OK 를 응답으로 보내준다.
   * 예외 상황에 대한 처리가 필요할 수 있다.
   * @param createProblemDto
   * @return { statusCode, SimpleProblemDto }
   */
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

  /**
   * queryString 으로 skip 과 take 으로 받는다.
   * skip 은 0, take 는 1000 을 기본 값으로 가진다.
   * @param skip
   * @param take
   * @return { statusCode, SimpleProblemDto[] }
   */
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
  async findAllQuestions(
    @Query('skip', new DefaultValuePipe(0))
    skip: number,
    @Query('take', new DefaultValuePipe(1000))
    take: number,
  ) {
    const simpleProblemDtoList = await this.problemService.findAllWithPaging({
      skip,
      take,
    });

    return {
      statusCode: HttpStatus.OK,
      ...simpleProblemDtoList,
    };
  }

  /**
   * problemId 를 이용하여 problem 을 검색한다.
   * 존재하지 않으면 응답으로 BAD_REQUEST 가 반환되고, 존재하면 OK 가 응답으로 반환된다.
   * @param problemId
   * @return { statusCode, SimpleProblemDto }
   */
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
    const simpleProblemDto = await this.problemService.findProblem(problemId);

    return {
      statusCode:
        simpleProblemDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleProblemDto,
    };
  }

  /**
   * problemId 를 이용하여 problem 을 검색한다.
   * 존재하지 않으면 update 가 일어나지 않고 BAD_REQUEST 를 응답으로 반환한다.
   * 존재하면 update 가 일어나고 OK 가 응답으로 반환된다.
   * @param problemId
   * @param updateProblemDto
   * @return { statusCode, SimpleProblemDto[] }
   */
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

  /**
   * problemId 를 이용하여 problem 을 검색한다.
   * 존재하지 않으면 delete 가 일어나지 않고 BAD_REQUEST 를 응답으로 반환한다.
   * 존재하면 delete 가 일어나고 OK 가 응답으로 반환된다.
   * @param problemId
   * @return { statusCode, SimpleProblemDto }
   */
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
