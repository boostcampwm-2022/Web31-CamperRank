import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function createTestUser(
  userId: number,
  loginId: string,
  password: string,
) {
  const user = User.createUser({
    loginId: loginId,
    password: await bcrypt.hash(password, 10),
    userStatus: 0,
  });

  user.id = userId;
  const now = new Date();
  user.createdAt = now;
  user.updatedAt = now;

  return user;
}
