import { Injectable } from '@nestjs/common';
import { CreateSolvedDto } from './dto/create-solved.dto';
import { UpdateSolvedDto } from './dto/update-solved.dto';
import { Solved } from './entities/solved.entity';
import { SimpleSolvedDto } from './dto/simple-solved.dto';
import { isFalsy } from '../utils/boolUtils';
import { SolvedResult } from './entities/SolvedResult.enum';
import { GradeSolvedDto } from './dto/grade-solved.dto';
import { SolvedRepository } from './solved.repository';
import { UserRepository } from '../users/user.repository';
import { TestCaseRepository } from '../test-case/test-case.repository';
import { ProblemRepository } from '../problem/problem.repository';

@Injectable()
export class SolvedService {
  constructor(
    private readonly solvedRepository: SolvedRepository,
    private readonly problemRepository: ProblemRepository,
    private readonly userRepository: UserRepository,
    private readonly testCaseRepository: TestCaseRepository,
  ) {}

  async create(createSolvedDto: CreateSolvedDto) {
    const foundProblem = await this.problemRepository.findOneBy({
      id: createSolvedDto.problemId,
    });

    const foundUser = await this.userRepository.findOneBy({
      loginId: createSolvedDto.loginId,
    });

    if (foundProblem !== null && foundUser !== null) {
      const solved = Solved.createSolved({
        problem: foundProblem,
        user: foundUser,
        userCode: createSolvedDto.userCode,
        language: createSolvedDto.language,
        result: SolvedResult.Ready,
      });
      const savedSolved = await this.solvedRepository.save(solved);
      return new SimpleSolvedDto(savedSolved);
    } else {
      return null;
    }
  }

  async createToGrade(createSolvedDto: CreateSolvedDto) {
    const foundProblem = await this.problemRepository.findOneBy({
      id: createSolvedDto.problemId,
    });

    const foundUser = await this.userRepository.findOneBy({
      loginId: createSolvedDto.loginId,
    });

    console.log('createSolvedDto.loginId', createSolvedDto.loginId);
    console.log('foundUser', foundUser);
    console.log('foundProblem', foundProblem);

    if (foundProblem !== null && foundUser !== null) {
      const solved = Solved.createSolved({
        problem: foundProblem,
        user: foundUser,
        userCode: createSolvedDto.userCode,
        language: createSolvedDto.language,
        result: SolvedResult.Ready,
      });

      const savedSolved = await this.solvedRepository.save(solved);
      const foundTestCases = await this.testCaseRepository.find({
        where: {
          problem: {
            id: createSolvedDto.problemId,
          },
        },
      });
      return foundTestCases.map((value) => {
        return new GradeSolvedDto(savedSolved, value);
      });
    } else {
      return null;
    }
  }

  /**
   * solved가 저장되지 않는다.
   * @param createSolvedDto
   */
  async createToTest(createSolvedDto: CreateSolvedDto) {
    const foundProblem = await this.problemRepository.findOneBy({
      id: createSolvedDto.problemId,
    });

    const foundUser = await this.userRepository.findOneBy({
      loginId: createSolvedDto.loginId,
    });

    if (foundProblem !== null && foundUser !== null) {
      const solved = Solved.createSolved({
        problem: foundProblem,
        user: foundUser,
        userCode: createSolvedDto.userCode,
        language: createSolvedDto.language,
        result: SolvedResult.Ready,
      });

      const foundTestCases = await this.testCaseRepository.find({
        where: {
          problem: {
            id: createSolvedDto.problemId,
          },
        },
        take: 3,
      });
      return foundTestCases.map((value) => {
        return new GradeSolvedDto(solved, value);
      });
    } else {
      return null;
    }
  }

  async findAll() {
    const solvedList = await this.solvedRepository.find();
    return solvedList.map((value: Solved) => {
      return new SimpleSolvedDto(value);
    });
  }

  async findSolvedById(solvedId) {
    const solved = await this.solvedRepository.findOneBy({ id: solvedId });
    return new SimpleSolvedDto(solved);
  }

  async updateResult(solvedId, solvedResult) {
    const solved = await this.solvedRepository.findOneBy({ id: solvedId });
    solved.result = solvedResult;
    const updatedSolved = await this.solvedRepository.save(solved);
    // console.log(updatedSolved);
    return new SimpleSolvedDto(updatedSolved);
  }

  async findSolvedByOpt({ problemId, userId }) {
    const solvedList = await this.solvedRepository.find({
      where: {
        problem: {
          id: problemId,
        },
        user: {
          id: userId,
        },
      },
    });
    return solvedList.map((value: Solved) => {
      return new SimpleSolvedDto(value);
    });
  }

  async update(solvedId: number, updateSolvedDto: UpdateSolvedDto) {
    const foundSolved = await this.solvedRepository.findOneBy({
      id: solvedId,
    });

    if (foundSolved !== null) {
      if (!isFalsy(updateSolvedDto.loginId)) {
        foundSolved.user = await this.userRepository.findOneBy({
          loginId: updateSolvedDto.loginId,
        });
      }

      if (!isFalsy(updateSolvedDto.problemId)) {
        foundSolved.problem = await this.problemRepository.findOneBy({
          id: updateSolvedDto.problemId,
        });
      }

      if (
        updateSolvedDto.result !== undefined &&
        updateSolvedDto.result !== null
      ) {
        foundSolved.result = updateSolvedDto.result;
      }

      const updatedSolved = await this.solvedRepository.save(foundSolved);
      return new SimpleSolvedDto(updatedSolved);
    } else {
      return null;
    }
  }

  async remove(solvedId: number) {
    const foundSolved = await this.solvedRepository.findOneBy({
      id: solvedId,
    });
    if (foundSolved !== null) {
      const removedSolved = await this.solvedRepository.remove(foundSolved);
      return new SimpleSolvedDto(removedSolved);
    } else {
      return null;
    }
  }
}
