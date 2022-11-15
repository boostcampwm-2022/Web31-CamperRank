import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestCaseService } from './test-case.service';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';

@Controller('test-case')
export class TestCaseController {
  constructor(private readonly testCaseService: TestCaseService) {}

  @Post()
  create(@Body() createTestCaseDto: CreateTestCaseDto) {
    return this.testCaseService.create(createTestCaseDto);
  }

  @Get()
  findAll() {
    return this.testCaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testCaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestCaseDto: UpdateTestCaseDto) {
    return this.testCaseService.update(+id, updateTestCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testCaseService.remove(+id);
  }
}
