import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
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
    //TODO: 입력받은 loginId와 password가 규격을 따르는지 검증한다.
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
    @Query('userId') userId: string,
    @Query('loginId') loginId: string,
  ) {
    const simpleUserDto = await this.usersService.findUserByLoginId(loginId);
    return {
      statusCode:
        simpleUserDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleUserDto,
    };
  }

  // @Get()
  // async findAll() {
  //   const simpleUserDtoList = await this.usersService.findAll();
  //   return {
  //     statusCode: HttpStatus.OK,
  //     ...simpleUserDtoList,
  //   };
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
