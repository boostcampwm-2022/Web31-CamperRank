import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.solvedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solvedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolvedDto: UpdateSolvedDto) {
    return this.solvedService.update(+id, updateSolvedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solvedService.remove(+id);
  }
}
