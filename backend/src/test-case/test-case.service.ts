import { Injectable } from '@nestjs/common';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import { TestCase } from './entities/test-case.entity';
import { SimpleTestCaseDto } from './dto/simple-testCase.dto';
import { FindTestCaseOption } from './dto/findTestCaseOption.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from '../problem/entities/problem.entity';

@Injectable()
export class TestCaseService {
  constructor(
    @InjectRepository(TestCase)
    private readonly testCaseRepository: Repository<TestCase>,
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
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

  async findTestCaseOption({
    testCaseId,
    problemId,
    skip,
    take,
  }: FindTestCaseOption) {
    const testCase = await this.testCaseRepository.find({
      where: {
        id: testCaseId,
        problem: {
          id: problemId,
        },
      },
      skip,
      take,
    });

    return testCase.map((value: TestCase) => {
      return new SimpleTestCaseDto(value);
    });
  }

  async update(testCaseId: number, updateTestCaseDto: UpdateTestCaseDto) {
    const foundTestCase = await this.testCaseRepository.findOneBy({
      id: testCaseId,
    });

    if (foundTestCase === null || foundTestCase === undefined) {
      return null;
    }

    foundTestCase.caseNumber =
      updateTestCaseDto.caseNumber || foundTestCase.caseNumber;
    foundTestCase.testInput =
      updateTestCaseDto.testInput || foundTestCase.testInput;
    foundTestCase.testOutput =
      updateTestCaseDto.testOutput || foundTestCase.testOutput;
    const updatedTestCase = await this.testCaseRepository.save(foundTestCase);
    return new SimpleTestCaseDto(updatedTestCase);
  }

  async remove(testCaseId: number) {
    const foundTestCase = await this.testCaseRepository.findOneBy({
      id: testCaseId,
    });

    if (foundTestCase === null || foundTestCase === undefined) {
      return null;
    }

    const deletedTestCase = await this.testCaseRepository.remove(foundTestCase);

    return new SimpleTestCaseDto(deletedTestCase);
  }
}
