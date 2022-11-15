import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { ProblemRepository } from './problem.repository';

@Injectable()
export class ProblemService {
  constructor(private problemRepository: ProblemRepository) {}

  async create(createProblemDto: CreateProblemDto) {
    try {
      const problem = Problem.createProblem({
        title: createProblemDto.title,
        description: createProblemDto.description,
        inputFormat: createProblemDto.inputFormat,
        constraints: createProblemDto.constraints,
        sampleInput: createProblemDto.sampleInput,
        sampleOutput: createProblemDto.sampleOutput,
        sampleExplanation: createProblemDto.sampleExplanation,
      });
      const savedProblem = await this.problemRepository.saveProblem(problem);
      return { result: true, problem: savedProblem };
    } catch (e) {
      console.error(e);
    }
  }

  findAll() {
    return `This action returns all problem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} problem`;
  }

  update(id: number, updateProblemDto: UpdateProblemDto) {
    return `This action updates a #${id} problem`;
  }

  remove(id: number) {
    return `This action removes a #${id} problem`;
  }
}
