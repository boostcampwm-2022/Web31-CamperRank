import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleUserDto } from './dto/simple-user.dto';
import { isFalsy } from '../utils/boolUtils';

@Controller('users')
@ApiTags('사용자 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiResponse({ description: '유저를 생성한다.', type: SimpleUserDto })
  @UsePipes(ValidationPipe)
  async signupUser(@Body() createUserDto: CreateUserDto) {
    const simpleUserDto = await this.usersService.create(createUserDto);

    if (simpleUserDto !== null) {
      return { ...simpleUserDto };
    } else {
      throw new HttpException(
        '회원가입을 진행할 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '유저 검색 API', description: '유저를 검색한다.' })
  @ApiResponse({
    description:
      '사용자 식별 아이디(userId) 또는 로그인 아이디(loginId)를 받아 유저를 검색한다.',
    status: HttpStatus.OK,
    type: SimpleUserDto,
  })
  async findUser(@Query('loginId') loginId: string) {
    if (isFalsy(loginId)) {
      throw new HttpException('잘못된 요청입니다.', HttpStatus.BAD_REQUEST);
    }

    const simpleUserDto = await this.usersService.findOneUser({
      loginId: loginId,
    });

    if (simpleUserDto !== null) {
      return { ...simpleUserDto };
    } else {
      throw new HttpException(
        '사용자를 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
