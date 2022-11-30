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
import { TestCaseService } from './test-case.service';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleTestCaseDto } from './dto/simple-testCase.dto';

@Controller('test-case')
@ApiTags('테스트 케이스 API')
export class TestCaseController {
  constructor(private readonly testCaseService: TestCaseService) {}

  /**
   * problemId, caseNumber, testInput, testOutput 을 body 로 입력받는다.
   * problemId 와 caseNumber 를 조건으로 검색하여 동일한 테스트 케이스를 찾으면 BAD_REQUEST 를 반환한다.
   * 동일한 테스트 케이스가 없고 저장이 완료되면 OK 와 저장된 테스트 케이스의 DTO 가 반환된다.
   * @param createTestCaseDto
   * @return { statusCode, SimpleTestCaseDto }
   */
  @Post()
  @ApiOperation({
    summary: '테스트 케이스 추가 API',
    description: '테스트 케이스를 추가한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 번호와 테스트 케이스 번호, 테스트 입출력을 통해 테스트 케이스 정보를 저장한다.',
    status: HttpStatus.OK,
    type: SimpleTestCaseDto,
  })
  @UsePipes(ValidationPipe)
  async create(@Body() createTestCaseDto: CreateTestCaseDto) {
    const simpleTestCaseDto = await this.testCaseService.create(
      createTestCaseDto,
    );

    return {
      statusCode:
        simpleTestCaseDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleTestCaseDto,
    };
  }

  /**
   * testCaseId 와 problemId 를 이용하여 테스트 케이스를 조회한다.
   * testCaseId 와 problemId 모두 undefined 라면 Select * FROM testCase OFFSET 0 LIMIT 30; 쿼리가 보내진다.
   * @param testCaseId
   * @param problemId
   * @param skip
   * @param take
   */
  @Get()
  @ApiOperation({
    summary: '테스트 케이스 검색 API',
    description: '테스트 케이스를 검색한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 번호와 테스트 케이스 번호를 통해 테스트 케이스를 검색한다.',
    status: HttpStatus.OK,
    type: SimpleTestCaseDto,
  })
  async findTestCase(
    @Query('testCaseId') testCaseId: number,
    @Query('problemId') problemId: number,
    @Query('skip', new DefaultValuePipe(0)) skip: number,
    @Query('take', new DefaultValuePipe(30)) take: number,
  ) {
    const simpleTestCaseDtoList = await this.testCaseService.findTestCaseOption(
      { testCaseId, problemId, skip, take },
    );

    return {
      statusCode: HttpStatus.OK,
      ...simpleTestCaseDtoList,
    };
  }

  /**
   * testCaseId 를 이용하여 testCase 를 검색하고 해당 testCase 를 업데이트 한다.
   * @param testCaseId
   * @param updateTestCaseDto
   * @return { statusCode, SimpleTestCaseDto }
   */
  @Patch(':testCaseId')
  @ApiOperation({
    summary: '테스트 케이스 수정 API',
    description: '테스트 케이스를 수정한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 번호와 테스트 케이스 번호, 테스트 입출력을 입력으로 받아 테스트 케이스 정보를 수정한다.',
    status: HttpStatus.OK,
    type: SimpleTestCaseDto,
  })
  @UsePipes(ValidationPipe)
  async update(
    @Param(
      'testCaseId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    testCaseId: number,
    @Body() updateTestCaseDto: UpdateTestCaseDto,
  ) {
    const simpleTestCaseDto = await this.testCaseService.update(
      testCaseId,
      updateTestCaseDto,
    );

    return {
      statusCode:
        simpleTestCaseDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleTestCaseDto,
    };
  }

  /**
   * testCaseId 를 이용하여 검색을 진행한다.
   * 존재하는 testCase 인 경우 삭제를 한다.
   * 존재하지 않으면 삭제를 진행할 수 없고, BAD_REQUEST 가 반환된다.
   * @param testCaseId
   * @return { statusCode, SimpleTestCaseDto }
   */
  @Delete(':testCaseId')
  @ApiOperation({
    summary: '테스트 케이스 삭제 API',
    description: '테스트 케이스를 삭제한다.',
  })
  @ApiResponse({
    description: '테스트 케이스 식별 번호를 통해 테스트 케이스를 삭제한다.',
    status: HttpStatus.OK,
    type: SimpleTestCaseDto,
  })
  async remove(
    @Param(
      'testCaseId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    testCaseId: number,
  ) {
    const simpleTestCaseDto = await this.testCaseService.remove(testCaseId);

    return {
      statusCode:
        simpleTestCaseDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleTestCaseDto,
    };
  }
}
