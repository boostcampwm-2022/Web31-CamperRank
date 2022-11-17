import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
  async create(@Body() createSolvedDto: CreateSolvedDto) {
    const simpleSolvedDto = await this.solvedService.create(createSolvedDto);
    return {
      statusCode:
        simpleSolvedDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleSolvedDto,
    };
  }

  @Get()
  async findOne(
    @Query('problemId') problemId: string,
    @Query('userId') userId: string,
  ) {
    const simpleSolvedDtos = await this.solvedService.findSolvedByOpt({
      problemId,
      userId,
    });
    return {
      statusCode: HttpStatus.OK,
      ...simpleSolvedDtos,
    };
  }

  @Patch(':solvedId')
  async update(
    @Param('solvedId') solvedId: string,
    @Body() updateSolvedDto: UpdateSolvedDto,
  ) {
    const simpleSolvedDto = await this.solvedService.update(
      +solvedId,
      updateSolvedDto,
    );
    return {
      statusCode:
        simpleSolvedDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleSolvedDto,
    };
  }

  @Delete(':solvedId')
  async remove(@Param('solvedId') solvedId: string) {
    const simpleSolvedDto = await this.solvedService.remove(+solvedId);
    return {
      statusCode:
        simpleSolvedDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleSolvedDto,
    };
  }
}
