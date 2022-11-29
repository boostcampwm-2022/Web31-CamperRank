import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { SimpleProblemDto } from './dto/simple-problem.dto';
import { ProblemRepository } from './problem.repository';

@Injectable()
export class ProblemService {
  constructor(private readonly problemRepository: ProblemRepository) {}

  async create(createProblemDto: CreateProblemDto) {
    const problem = Problem.createProblem({
      title: createProblemDto.title,
      level: createProblemDto.level,
      description: createProblemDto.description,
    });
    const savedProblem = await this.problemRepository.save(problem);
    return new SimpleProblemDto(savedProblem);
  }

  async findAll() {
    const problems = await this.problemRepository.find();
    return problems.map((value: Problem) => {
      return new SimpleProblemDto(value);
    });
  }

  async findProblem(problemId: number) {
    const foundProblem = await this.problemRepository.findOneBy({
      id: problemId,
    });
    return foundProblem !== null ? new SimpleProblemDto(foundProblem) : null;
  }

  async update(problemId: number, updateProblemDto: UpdateProblemDto) {
    const foundProblem = await this.problemRepository.findOneBy({
      id: problemId,
    });
    if (foundProblem !== null) {
      foundProblem.title = updateProblemDto.title;
      foundProblem.level = updateProblemDto.level;
      foundProblem.description = updateProblemDto.description;

      const updatedProblem = await this.problemRepository.save(foundProblem);
      return new SimpleProblemDto(updatedProblem);
    } else {
      return null;
    }
  }

  async remove(problemId: number) {
    const foundProblem = await this.problemRepository.findOneBy({
      id: problemId,
    });
    if (foundProblem !== null) {
      const deletedProblem = await this.problemRepository.remove(foundProblem);
      return new SimpleProblemDto(deletedProblem);
    } else {
      return null;
    }
  }
}
