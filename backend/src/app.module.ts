import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProblemModule } from './problem/problem.module';
import { typeormConfig } from './config/typeorm.config';
import { TestCaseModule } from './test-case/test-case.module';
import { SolvedModule } from './solved/solved.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    // }),
    TypeOrmModule.forRoot(typeormConfig),
    UsersModule,
    ProblemModule,
    TestCaseModule,
    SolvedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
