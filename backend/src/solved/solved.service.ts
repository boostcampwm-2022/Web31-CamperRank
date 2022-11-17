import { Injectable } from '@nestjs/common';
import { CreateSolvedDto } from './dto/create-solved.dto';
import { UpdateSolvedDto } from './dto/update-solved.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solved } from './entities/solved.entity';
import { Problem } from '../problem/entities/problem.entity';
import { User } from '../users/entities/user.entity';
import { SimpleSolvedDto } from './dto/simple-solved.dto';
import { isFalsy } from '../utils/boolUtils';

@Injectable()
export class SolvedService {
  constructor(
    @InjectRepository(Solved) private solvedRepository: Repository<Solved>,
    @InjectRepository(Problem) private problemRepository: Repository<Problem>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createSolvedDto: CreateSolvedDto) {
    const foundProblem = await this.problemRepository.findOneBy({
      id: createSolvedDto.problemId,
    });

    const foundUser = await this.userRepository.findOneBy({
      id: createSolvedDto.userId,
    });

    if (foundProblem !== null && foundUser !== null) {
      const solved = Solved.createSolved({
        problem: foundProblem,
        user: foundUser,
        userCode: createSolvedDto.userCode,
      });
      const savedSolved = await this.solvedRepository.save(solved);
      return new SimpleSolvedDto(savedSolved);
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
      if (!isFalsy(updateSolvedDto.userId)) {
        foundSolved.user = await this.userRepository.findOneBy({
          id: updateSolvedDto.userId,
        });
      }

      if (!isFalsy(updateSolvedDto.problemId)) {
        foundSolved.problem = await this.problemRepository.findOneBy({
          id: updateSolvedDto.problemId,
        });
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
