import { Injectable } from '@nestjs/common';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestCase } from './entities/test-case.entity';
import { Problem } from '../problem/entities/problem.entity';
import { SimpleTestCaseDto } from './dto/simple-testCase.dto';

@Injectable()
export class TestCaseService {
  constructor(
    @InjectRepository(TestCase)
    private testCaseRepository: Repository<TestCase>,
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
  ) {}

  async create(createTestCaseDto: CreateTestCaseDto) {
    const foundTestCase = await this.testCaseRepository.findOneBy({
      problem: {
        id: createTestCaseDto.problemId,
      },
      caseNumber: createTestCaseDto.caseNumber,
    });
    if (foundTestCase) {
      return null;
    }

    const testCase = TestCase.createTestCase({
      problem: await this.problemRepository.findOneBy({
        id: createTestCaseDto.problemId,
      }),
      caseNumber: createTestCaseDto.caseNumber,
      testInput: createTestCaseDto.testInput,
      testOutput: createTestCaseDto.testOutput,
    });
    const savedTestCase = await this.testCaseRepository.save(testCase);
    return new SimpleTestCaseDto(savedTestCase);
  }

  async findTestCaseOpt({ testCaseId, problemId }) {
    const testCase = await this.testCaseRepository.find({
      where: {
        id: testCaseId,
        problem: {
          id: problemId,
        },
      },
    });

    return testCase.map((value: TestCase) => {
      return new SimpleTestCaseDto(value);
    });
  }

  async update(testCaseId: number, updateTestCaseDto: UpdateTestCaseDto) {
    const foundTestCase = await this.testCaseRepository.findOneBy({
      id: testCaseId,
    });
    if (foundTestCase !== null) {
      foundTestCase.caseNumber = updateTestCaseDto.caseNumber;
      foundTestCase.testInput = updateTestCaseDto.testInput;
      foundTestCase.testOutput = updateTestCaseDto.testOutput;
      const updatedTestCase = await this.testCaseRepository.save(foundTestCase);
      return new SimpleTestCaseDto(updatedTestCase);
    } else {
      return null;
    }
  }

  async remove(testCaseId: number) {
    const foundTestCase = await this.testCaseRepository.findOneBy({
      id: testCaseId,
    });
    if (foundTestCase !== null) {
      const deletedTestCase = await this.testCaseRepository.remove(
        foundTestCase,
      );
      return new SimpleTestCaseDto(deletedTestCase);
    } else {
      return null;
    }
  }
}
