import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProblemModule } from './problem/problem.module';
import { typeormConfig } from './config/typeorm.config';
import { TestCaseModule } from './test-case/test-case.module';
import { SolvedModule } from './solved/solved.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { TestCase } from './test-case/entities/test-case.entity';
import { Solved } from './solved/entities/solved.entity';
import { Problem } from './problem/entities/problem.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      // configuration 설정을 coifg module 불러 올 때 로드한다
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [User, TestCase, Solved, Problem],
        synchronize: false,
      }),
    }),
    UsersModule,
    ProblemModule,
    TestCaseModule,
    SolvedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
