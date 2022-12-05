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
import { TestCaseService } from './test-case.service';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleTestCaseDto } from './dto/simple-testCase.dto';
import { isFalsy } from '../utils/boolUtils';

@Controller('test-case')
@ApiTags('테스트 케이스 API')
export class TestCaseController {
  constructor(private readonly testCaseService: TestCaseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '테스트 케이스 추가 API',
    description: '테스트 케이스를 추가한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 번호와 테스트 케이스 번호, 테스트 입출력을 통해 테스트 케이스 정보를 저장한다.',
    status: HttpStatus.CREATED,
    type: SimpleTestCaseDto,
  })
  @UsePipes(ValidationPipe)
  async createTestCase(@Body() createTestCaseDto: CreateTestCaseDto) {
    const simpleTestCaseDto = await this.testCaseService.create(
      createTestCaseDto,
    );

    if (simpleTestCaseDto !== null) {
      return { ...simpleTestCaseDto };
    } else {
      throw new HttpException(
        '테스트케이스를 추가할 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
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
    if (isFalsy(testCaseId) && isFalsy(problemId)) {
      throw new HttpException(
        'testcaseId 또는 problemId 둘 중 하나는 필수입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const simpleTestCaseDtoList = await this.testCaseService.findTestCaseOption(
      { testCaseId, problemId, skip, take },
    );

    if (simpleTestCaseDtoList.length > 0) {
      return { ...simpleTestCaseDtoList };
    } else {
      throw new HttpException(
        '테스트 케이스가 존재하지 않습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':testCaseId')
  @HttpCode(HttpStatus.OK)
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
  async updateTestCase(
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

    if (simpleTestCaseDto !== null) {
      return { ...simpleTestCaseDto };
    } else {
      throw new HttpException(
        '테스트 케이스를 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':testCaseId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '테스트 케이스 삭제 API',
    description: '테스트 케이스를 삭제한다.',
  })
  @ApiResponse({
    description: '테스트 케이스 식별 번호를 통해 테스트 케이스를 삭제한다.',
    status: HttpStatus.OK,
    type: SimpleTestCaseDto,
  })
  async removeTestCase(
    @Param(
      'testCaseId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    testCaseId: number,
  ) {
    const simpleTestCaseDto = await this.testCaseService.remove(testCaseId);

    if (simpleTestCaseDto !== null) {
      return { ...simpleTestCaseDto };
    } else {
      throw new HttpException(
        '삭제할 테스트 케이스를 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
