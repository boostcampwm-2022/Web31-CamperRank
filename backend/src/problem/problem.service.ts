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
        level: createProblemDto.level,
        description: createProblemDto.description,
      });
      const savedProblem = await this.problemRepository.saveProblem(problem);
      return { result: true, problem: savedProblem };
    } catch (e) {
      console.error(e);
    }
  }

  async findAll() {
    try {
      const problems = await this.problemRepository.findProblems();
      return { result: true, problemList: problems };
    } catch (e) {
      console.error(e);
    }
  }

  async findProblem(problemId: number) {
    try {
      const foundProblem = await this.problemRepository.findProblemById(
        problemId,
      );
      return { result: true, problem: foundProblem };
    } catch (e) {
      console.error(e);
    }
  }

  async update(problemId: number, updateProblemDto: UpdateProblemDto) {
    try {
      const foundProblem = await this.problemRepository.findProblemById(
        problemId,
      );
      if (foundProblem) {
        foundProblem.title = updateProblemDto.title;
        foundProblem.level = updateProblemDto.level;
        foundProblem.description = updateProblemDto.description;
        const updatedProblem = await this.problemRepository.save(foundProblem);
        return { result: true, problem: updatedProblem };
      } else {
        return { result: false, problem: null };
      }
    } catch (e) {
      console.error(e);
      return { result: false, problem: null };
    }
  }

  async remove(problemId: number) {
    try {
      const problem = await this.problemRepository.removeProblem(problemId);
      return { result: true, problem: problem };
    } catch (e) {
      console.error(e);
    }
  }
}
