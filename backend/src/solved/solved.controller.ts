import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SolvedService } from './solved.service';
import { CreateSolvedDto } from './dto/create-solved.dto';
import { UpdateSolvedDto } from './dto/update-solved.dto';

@Controller('solved')
export class SolvedController {
  constructor(private readonly solvedService: SolvedService) {}

  @Post()
  create(@Body() createSolvedDto: CreateSolvedDto) {
    return this.solvedService.create(createSolvedDto);
  }

  @Get()
  findOne(
    @Query('problemId') problemId: string,
    @Query('userId') userId: string,
  ) {
    return this.solvedService.findSolvedByOpt({ problemId, userId });
  }

  @Patch(':solvedId')
  update(
    @Param('solvedId') solvedId: string,
    @Body() updateSolvedDto: UpdateSolvedDto,
  ) {
    return this.solvedService.update(+solvedId, updateSolvedDto);
  }

  @Delete(':solvedId')
  remove(@Param('solvedId') solvedId: string) {
    return this.solvedService.remove(+solvedId);
  }
}
