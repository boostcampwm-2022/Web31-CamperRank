import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { SimpleProblemDto } from './dto/simple-problem.dto';
import { ProblemRepository } from './problem.repository';
import { findAllWithPaging } from './dto/findAllWithPaging.interface';

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

  async findAllWithPaging({ skip, take }: findAllWithPaging) {
    const problems = await this.problemRepository.find({
      skip,
      take,
    });

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

    if (foundProblem === null || foundProblem === undefined) {
      return null;
    }

    foundProblem.title = updateProblemDto.title || foundProblem.title;
    foundProblem.level = updateProblemDto.level || foundProblem.level;
    foundProblem.description =
      updateProblemDto.description || foundProblem.description;

    const updatedProblem = await this.problemRepository.save(foundProblem);

    return new SimpleProblemDto(updatedProblem);
  }

  async remove(problemId: number) {
    const foundProblem = await this.problemRepository.findOneBy({
      id: problemId,
    });

    if (foundProblem === null || foundProblem === undefined) {
      return null;
    }

    const deletedProblem = await this.problemRepository.remove(foundProblem);

    return new SimpleProblemDto(deletedProblem);
  }
}
