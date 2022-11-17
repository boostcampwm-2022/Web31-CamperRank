import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../commons/entities/baseTime.entity';
import { Solved } from '../../solved/entities/solved.entity';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'login_id', length: 20, nullable: false, unique: true })
  loginId: string;

  @Column({ nullable: false })
  password: string;

  @Column({ name: 'user_status' })
  userStatus: number;

  solvedList: Solved[];

  public static createUser({ loginId, password, userStatus }) {
    const user = new User();
    user.loginId = loginId;
    user.password = password;
    user.userStatus = userStatus;
    return user;
  }
}
