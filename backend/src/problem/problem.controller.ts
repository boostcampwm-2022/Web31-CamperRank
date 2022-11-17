import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
  async create(@Body() createProblemDto: CreateProblemDto) {
    const simpleProblemDto = await this.problemService.create(createProblemDto);
    return {
      statusCode:
        simpleProblemDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleProblemDto,
    };
  }

  @Get()
  async findAll() {
    const simpleProblemDtos = await this.problemService.findAll();
    return {
      statusCode: HttpStatus.OK,
      ...simpleProblemDtos,
    };
  }

  @Get(':problemId')
  async findOne(@Param('problemId') problemId: string) {
    const simpleProblemDto = await this.problemService.findProblem(+problemId);
    return {
      statusCode:
        simpleProblemDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleProblemDto,
    };
  }

  @Patch(':problemId')
  async update(
    @Param('problemId') problemId: string,
    @Body() updateProblemDto: UpdateProblemDto,
  ) {
    const simpleProblemDto = await this.problemService.update(
      +problemId,
      updateProblemDto,
    );

    return {
      statusCode:
        simpleProblemDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleProblemDto,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const simpleProblemDto = await this.problemService.remove(+id);
    return {
      statusCode:
        simpleProblemDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleProblemDto,
    };
  }
}
