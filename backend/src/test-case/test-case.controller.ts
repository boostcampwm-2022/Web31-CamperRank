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
import { TestCaseService } from './test-case.service';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleTestCaseDto } from './dto/simple-testCase.dto';

@Controller('test-case')
@ApiTags('테스트 케이스 API')
export class TestCaseController {
  constructor(private readonly testCaseService: TestCaseService) {}

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
    @Query('testCaseId') testCaseId: string,
    @Query('problemId') problemId: string,
  ) {
    const simpleTestCaseDtos = await this.testCaseService.findTestCaseOpt({
      testCaseId: testCaseId,
      problemId: problemId,
    });
    return {
      statusCode: HttpStatus.OK,
      ...simpleTestCaseDtos,
    };
  }

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
  async update(
    @Param('testCaseId') testCaseId: string,
    @Body() updateTestCaseDto: UpdateTestCaseDto,
  ) {
    const simpleTestCaseDto = await this.testCaseService.update(
      +testCaseId,
      updateTestCaseDto,
    );
    return {
      statusCode:
        simpleTestCaseDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleTestCaseDto,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: '테스트 케이스 삭제 API',
    description: '테스트 케이스를 삭제한다.',
  })
  @ApiResponse({
    description: '테스트 케이스 식별 번호를 통해 테스트 케이스를 삭제한다.',
    status: HttpStatus.OK,
    type: SimpleTestCaseDto,
  })
  async remove(@Param('id') id: string) {
    const simpleTestCaseDto = await this.testCaseService.remove(+id);
    return {
      statusCode:
        simpleTestCaseDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleTestCaseDto,
    };
  }
}
