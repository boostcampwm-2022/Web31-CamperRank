import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { SimpleProblemDto } from './dto/simple-problem.dto';
import { IFindProblemOptions } from './dto/findAllWithPaging.interface';
import { isFalsy } from '../utils/boolUtils';
import { InjectRepository } from '@nestjs/typeorm';
import { Solved } from '../solved/entities/solved.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
    @InjectRepository(Solved)
    private readonly solvedRepository: Repository<Solved>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
  async findAllProblems({
    loginId,
    isRandom,
    skip,
    take,
  }: IFindProblemOptions) {
    let problemList;

    if (isFalsy(loginId)) {
      problemList = await this.problemRepository
        .createQueryBuilder('problem')
        .select('*')
        .orderBy(isRandom ? 'RAND()' : '')
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
        .orderBy(isRandom ? 'RAND()' : '')
        .skip(skip)
        .take(take)
        .getRawMany();
    }

    return problemList.map((value: any) => {
      return new SimpleProblemDto(value);
    });
  }

  async findOneProblem(problemId: number) {
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
