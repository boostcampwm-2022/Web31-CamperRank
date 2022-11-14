import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entity/uesr.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '', // MySQL ID
      password: '', // MySQL password
      database: 'camperRank',
      entities: [User],
      synchronize: true, // 처음에만 true로 설정
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
