import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSolvedDto } from './create-solved.dto';
import { SolvedResult } from '../entities/SolvedResult.enum';
import { IsNotEmpty } from 'class-validator';

export class UpdateSolvedDto extends PartialType(CreateSolvedDto) {
  @ApiProperty({ description: '정답 제출 결과' })
  @IsNotEmpty()
  result: SolvedResult;
}
