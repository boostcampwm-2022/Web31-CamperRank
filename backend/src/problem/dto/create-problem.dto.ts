import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProblemDto {
  @ApiProperty({ description: '문제 제목' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '문제 난이도' })
  @IsNotEmpty()
  level: number;

  @ApiProperty({ description: '문제 설명 및 제한 사항 등등..' })
  @IsNotEmpty()
  description: string;

  constructor(title, level, description) {
    this.title = title;
    this.level = level;
    this.description = description;
  }
}
