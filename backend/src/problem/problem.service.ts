import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { SimpleProblemDto } from './dto/simple-problem.dto';
import { ProblemRepository } from './problem.repository';
import { findAllWithPaging } from './dto/findAllWithPaging.interface';
import { SolvedRepository } from '../solved/solved.repository';
import { UserRepository } from '../users/user.repository';
import { isFalsy } from '../utils/boolUtils';

@Injectable()
export class ProblemService {
  constructor(
    private readonly problemRepository: ProblemRepository,
    private readonly solvedRepository: SolvedRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createProblemDto: CreateProblemDto) {
    const problem = Problem.createProblem({
      title: createProblemDto.title,
      level: createProblemDto.level,
      description: createProblemDto.description,
    });

    const savedProblem = await this.problemRepository.save(problem);

    return new SimpleProblemDto(savedProblem);
  }

  // TODO: 쿼리를 한 번만 보내서 찾는 방법에 대한 고민이 필요하다.
  async findAllWithPaging({ loginId, skip, take }: findAllWithPaging) {
    let problemList;

    if (isFalsy(loginId)) {
      problemList = await this.problemRepository
        .createQueryBuilder('problem')
        .select('*')
        .skip(skip)
        .take(take)
        .getRawMany();
    } else {
      const foundUser = await this.userRepository.findOneBy({
        loginId: loginId,
      });

      const problemIdByLoginIdQuery = this.solvedRepository
        .createQueryBuilder('solved')
        .select('solved.problem.id as problemId')
        .where(`solved.userId = ${foundUser.id}`);

      problemList = await this.problemRepository
        .createQueryBuilder('problem')
        .select('*')
        .addSelect(
          `IF(problem.id IN (${problemIdByLoginIdQuery.getQuery()}), '1', '0') AS isSolved`,
        )
        .skip(skip)
        .take(take)
        .getRawMany();
    }

    return problemList.map((value: any) => {
      return new SimpleProblemDto(value);
    });
  }

  async findRandomProblem({ loginId }: findAllWithPaging) {
    let problemList;
    const skip = 0;
    const take = 6;

    if (isFalsy(loginId)) {
      problemList = await this.problemRepository
        .createQueryBuilder('problem')
        .select('*')
        .orderBy('RAND()')
        .skip(skip)
        .take(take)
        .getRawMany();
    } else {
      const foundUser = await this.userRepository.findOneBy({
        loginId: loginId,
      });

      const problemIdByLoginIdQuery = this.solvedRepository
        .createQueryBuilder('solved')
        .select('solved.problem.id as problemId')
        .where(`solved.userId = ${foundUser.id}`);

      problemList = await this.problemRepository
        .createQueryBuilder('problem')
        .select('*')
        .addSelect(
          `IF(problem.id IN (${problemIdByLoginIdQuery.getQuery()}), '1', '0') AS isSolved`,
        )
        .orderBy('RAND()')
        .skip(skip)
        .take(take)
        .getRawMany();
    }

    return problemList.map((value: Problem) => {
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
