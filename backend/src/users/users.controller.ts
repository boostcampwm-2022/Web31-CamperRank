import {
  Body,
  Controller,
  Get,
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

@Controller('users')
@ApiTags('사용자 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiResponse({ description: '유저를 생성한다.', type: SimpleUserDto })
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    //TODO: cross-validator로 검증을 진행한다.
    const simpleUserDto = await this.usersService.create(createUserDto);
    return {
      statusCode:
        simpleUserDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleUserDto,
    };
  }

  /**
   * userId 또는 loginId 를 입력받아서 유저를 검색한다.
   * 두 값이 모두 입력되지 않는 경우 typeorm 에서 undefined 조건으로 검색이 된다.
   * 이 경우 의도하지 않게 SELECT * FROM users LIMIT 1; 의 쿼리를 날린 것과 같은 상태가 되어
   * AutoIncrement 로 생성된 userId가 가장 작은 값이 나타나게 된다. (기본적으로 userId 가 1인 값이 반환된다.)
   * @param userId
   * @param loginId
   * @return { statusCode, SimpleUserDto }
   */
  @Get()
  @ApiOperation({ summary: '유저 검색 API', description: '유저를 검색한다.' })
  @ApiResponse({
    description:
      '사용자 식별 아이디(userId) 또는 로그인 아이디(loginId)를 받아 유저를 검색한다.',
    status: HttpStatus.OK,
    type: SimpleUserDto,
  })
  async findUser(
    @Query('userId') userId: number,
    @Query('loginId') loginId: string,
  ) {
    if (!userId && !loginId) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }

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
