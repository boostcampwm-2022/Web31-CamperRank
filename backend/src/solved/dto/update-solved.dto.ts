import { PartialType } from '@nestjs/swagger';
import { CreateSolvedDto } from './create-solved.dto';

export class UpdateSolvedDto extends PartialType(CreateSolvedDto) {}
