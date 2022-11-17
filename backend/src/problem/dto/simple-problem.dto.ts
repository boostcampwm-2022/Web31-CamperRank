import { Problem } from '../entities/problem.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SimpleProblemDto {
  @ApiProperty({ description: '문제 제목' })
  title: string;

  @ApiProperty({ description: '문제 난이도' })
  level: number;

  @ApiProperty({ description: '문제 설명 및 제한 사항 등등..' })
  description: string;

  @ApiProperty({ description: '문제 생성일' })
  createdAt: Date;

  @ApiProperty({ description: '문제 수정일' })
  updatedAt: Date;

  constructor(problem: Problem) {
    this.title = problem.title;
    this.level = problem.level;
    this.description = problem.description;
    this.createdAt = problem.createdAt;
    this.updatedAt = problem.updatedAt;
  }
}
