import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleUserDto } from './dto/simple-user.dto';

@Controller('users')
@ApiTags('사용자 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiResponse({ description: '유저를 생성한다.', type: SimpleUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    //TODO: cross-validator로 검증을 진행한다.
    const simpleUserDto = await this.usersService.create(createUserDto);
    return {
      statusCode:
        simpleUserDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleUserDto,
    };
  }

  @Get()
  @ApiOperation({ summary: '유저 검색 API', description: '유저를 검색한다.' })
  @ApiResponse({
    description:
      '사용자 식별 아이디 또는 로그인 아이디를 받아 유저를 검색한다.',
    status: HttpStatus.OK,
    type: SimpleUserDto,
  })
  async findUser(
    @Query(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    userId: number,
    @Query('loginId') loginId: string,
  ) {
    const simpleUserDto = await this.usersService.findUser({
      userId: userId,
      loginId: loginId,
    });
    return {
      statusCode:
        simpleUserDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleUserDto,
    };
  }
}
