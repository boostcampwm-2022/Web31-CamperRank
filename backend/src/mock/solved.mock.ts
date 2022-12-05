export const MockSolvedRepository = () => ({
  save: jest.fn(),
  createQueryBuilder: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  remove: jest.fn(),
});
