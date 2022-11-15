import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Problem } from '../problem/entities/problem.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: '', // MySQL ID
  password: '', // MySQL password
  database: 'camperRank',
  entities: [User, Problem],
  synchronize: false, // synchronize 옵션을 true로 하면 서비스가 실행되고 데이터베이스가 연결될 때 항상 데이터베이스가 초기화 되므로 절대 프로덕션에는 false로 설정
};
