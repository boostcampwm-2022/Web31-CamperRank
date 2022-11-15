import { Injectable } from '@nestjs/common';
import { CreateSolvedDto } from './dto/create-solved.dto';
import { UpdateSolvedDto } from './dto/update-solved.dto';

@Injectable()
export class SolvedService {
  create(createSolvedDto: CreateSolvedDto) {
    return 'This action adds a new solved';
  }

  findAll() {
    return `This action returns all solved`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solved`;
  }

  update(id: number, updateSolvedDto: UpdateSolvedDto) {
    return `This action updates a #${id} solved`;
  }

  remove(id: number) {
    return `This action removes a #${id} solved`;
  }
}
