import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmExModule } from '../typeorm/typeorm-ex.module';
import { UserRepository } from '../users/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    // TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],

  // 다른곳에서도 jwt 인증을 사용하기 위해 export
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
