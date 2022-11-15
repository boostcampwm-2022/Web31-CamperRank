import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmExModule } from '../typeorm/typeorm-ex.module';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [UsersController],
  // users 안에서 사용하기 위한 provider
  providers: [UsersService, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmExModule.forCustomRepository([UsersRepository]), // CustomRepository 를 사용하기 위해 추가
  ],
  // 다른곳에서도 jwt 인증을 사용하기 위해 export
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
