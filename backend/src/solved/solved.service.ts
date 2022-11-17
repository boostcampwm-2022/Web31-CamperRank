import { Injectable } from '@nestjs/common';
import { CreateSolvedDto } from './dto/create-solved.dto';
import { UpdateSolvedDto } from './dto/update-solved.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solved } from './entities/solved.entity';
import { Problem } from '../problem/entities/problem.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SolvedService {
  constructor(
    @InjectRepository(Solved) private solvedRepository: Repository<Solved>,
    @InjectRepository(Problem) private problemRepository: Repository<Problem>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createSolvedDto: CreateSolvedDto) {
    try {
      const solved = Solved.createSolved({
        problem: await this.problemRepository.findOneBy({
          id: createSolvedDto.problemId,
        }),
        user: await this.userRepository.findOneBy({
          id: createSolvedDto.userId,
        }),
        userCode: createSolvedDto.userCode,
      });
      const savedSolved = await this.solvedRepository.save(solved);
      return { result: true, solved: savedSolved };
    } catch (e) {
      console.error(e);
    }
  }

  async findAll() {
    return await this.solvedRepository.find();
  }

  async findSolvedById(solvedId) {
    return await this.solvedRepository.findOneBy({ id: solvedId });
  }

  async findSolvedByOpt({ problemId, userId }) {
    try {
      const solved = await this.solvedRepository.find({
        where: {
          problem: {
            id: problemId,
          },
          user: {
            id: userId,
          },
        },
      });
      return { result: true, solved };
    } catch (e) {}
  }

  async update(solvedId: number, updateSolvedDto: UpdateSolvedDto) {
    try {
      const foundSolved = await this.solvedRepository.findOneBy({
        id: solvedId,
      });

      //TODO: 입력받은 옵션인지 검증 필요
      foundSolved.user = await this.userRepository.findOneBy({
        id: updateSolvedDto.userId,
      });

      //TODO: 입력받은 옵션인지 검증 필요
      foundSolved.problem = await this.problemRepository.findOneBy({
        id: updateSolvedDto.problemId,
      });

      const updatedSolved = await this.solvedRepository.save(foundSolved);
      return { result: true, solved: updatedSolved };
    } catch (e) {
      console.error(e);
    }
  }

  async remove(solvedId: number) {
    try {
      const solved = await this.solvedRepository.remove(
        await this.solvedRepository.findOneBy({ id: solvedId }),
      );
      return { result: true, solved };
    } catch (e) {
      console.error(e);
    }
  }
}
