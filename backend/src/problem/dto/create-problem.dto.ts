import { ApiProperty } from '@nestjs/swagger';

export class CreateProblemDto {
  @ApiProperty({ description: '문제 제목' })
  title: string;

  @ApiProperty({ description: '문제 난이도' })
  level: number;

  @ApiProperty({ description: '문제 설명 및 제한 사항 등등..' })
  description: string;
}
