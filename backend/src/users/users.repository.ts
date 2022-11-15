import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CustomRepository } from '../typeorm/typeorm-ex.decorator';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  //TODO: 조금 더 고려 후 수정
  public async saveUser(user: User) {
    return await this.save(user);
  }

  public async findUserById(id: number) {
    return await this.findOneBy({ id });
  }

  public async findUserByLoginId(loginId: string) {
    return await this.findOneBy({ loginId });
  }

  public async findAllUsers() {
    return await this.find();
  }
}
