import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ProblemModule } from './problem/problem.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '', // MySQL ID
      password: '', // MySQL password
      database: 'camperRank',
      entities: [User],
      synchronize: false, // synchronize 옵션을 true로 하면 서비스가 실행되고 데이터베이스가 연결될 때 항상 데이터베이스가 초기화 되므로 절대 프로덕션에는 false로 설정
    }),
    UsersModule,
    ProblemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
