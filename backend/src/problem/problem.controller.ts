import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  create(@Body() createProblemDto: CreateProblemDto) {
    return this.problemService.create(createProblemDto);
  }

  @Get()
  findAll() {
    return this.problemService.findAll();
  }

  @Get(':problemId')
  findOne(@Param('problemId') problemId: string) {
    return this.problemService.findProblem(+problemId);
  }

  @Patch(':problemId')
  update(
    @Param('problemId') problemId: string,
    @Body() updateProblemDto: UpdateProblemDto,
  ) {
    return this.problemService.update(+problemId, updateProblemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemService.remove(+id);
  }
}
