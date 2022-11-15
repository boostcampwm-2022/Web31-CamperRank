import { Module } from '@nestjs/common';
import { SolvedService } from './solved.service';
import { SolvedController } from './solved.controller';

@Module({
  controllers: [SolvedController],
  providers: [SolvedService]
})
export class SolvedModule {}
