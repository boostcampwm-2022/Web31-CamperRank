import { Injectable } from '@nestjs/common';
import { CreateSolvedDto } from './dto/create-solved.dto';
import { UpdateSolvedDto } from './dto/update-solved.dto';
import { Solved } from './entities/solved.entity';
import { SimpleSolvedDto } from './dto/simple-solved.dto';
import { isFalsy } from '../utils/boolUtils';
import { SolvedResult } from './entities/SolvedResult.enum';
import { GradeSolvedDto } from './dto/grade-solved.dto';
import { IFindSolvedByOpt } from './dto/findSolvedByOpt.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from '../problem/entities/problem.entity';
import { Repository } from 'typeorm';
import { TestCase } from '../test-case/entities/test-case.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SolvedService {
  constructor(
    @InjectRepository(Solved)
    private readonly solvedRepository: Repository<Solved>,
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TestCase)
    private readonly testCaseRepository: Repository<TestCase>,
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

  async createToGrade({ createSolvedDto, skip, take, saveFlag }) {
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
        skip: skip,
        take: take,
      });

      if (saveFlag) {
        const savedSolved = await this.solvedRepository.save(solved);
        return foundTestCases.map((value) => {
          return new GradeSolvedDto(savedSolved, value);
        });
      } else {
        return foundTestCases.map((value) => {
          return new GradeSolvedDto(solved, value);
        });
      }
    } else {
      return null;
    }
  }

  async updateResult(solvedId, solvedResult) {
    const solved = await this.solvedRepository.findOneBy({ id: solvedId });
    solved.result = solvedResult;

    const updatedSolved = await this.solvedRepository.save(solved);
    // console.log(updatedSolved);
    return new SimpleSolvedDto(updatedSolved);
  }

  async findSolvedByOption({
    problemId,
    loginId,
    skip,
    take,
  }: IFindSolvedByOpt) {
    const solvedList = await this.solvedRepository.find({
      where: {
        problem: {
          id: problemId,
        },
        user: {
          loginId: loginId,
        },
      },
      skip: skip,
      take: take,
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

      foundSolved.result = updateSolvedDto.result || foundSolved.result;

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
