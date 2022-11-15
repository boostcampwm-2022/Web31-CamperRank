import { Module } from '@nestjs/common';
import { TestCaseService } from './test-case.service';
import { TestCaseController } from './test-case.controller';

@Module({
  controllers: [TestCaseController],
  providers: [TestCaseService]
})
export class TestCaseModule {}
