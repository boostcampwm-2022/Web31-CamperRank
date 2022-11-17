import { User } from '../entities/user.entity';

export class SimpleUserDto {
  userId: number;
  loginId: string;
  userStatus: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.userId = user.id;
    this.loginId = user.loginId;
    this.userStatus = user.userStatus;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
