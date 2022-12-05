export const MockProblemRepository = () => ({
  save: jest.fn(),
  createQueryBuilder: jest.fn(),
  findOneBy: jest.fn(),
  remove: jest.fn(),
});
