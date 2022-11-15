import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false, unique: true })
  loginId: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  userStatus: number;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  public static createUser({ loginId, password, userStatus }) {
    const user = new User();
    user.loginId = loginId;
    user.password = password;
    user.userStatus = userStatus;
    return user;
  }
}
