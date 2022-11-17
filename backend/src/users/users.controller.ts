import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
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

  @Get()
  async findAll() {
    const simpleUserDtoList = await this.usersService.findAll();
    return {
      statusCode: HttpStatus.OK,
      ...simpleUserDtoList,
    };
  }

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
