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

@Controller('test-case')
export class TestCaseController {
  constructor(private readonly testCaseService: TestCaseService) {}

  @Post()
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
  async remove(@Param('id') id: string) {
    const simpleTestCaseDto = await this.testCaseService.remove(+id);
    return {
      statusCode:
        simpleTestCaseDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleTestCaseDto,
    };
  }
}
