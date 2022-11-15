import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //TODO: 입력받은 loginId와 password가 규격을 따르는지 검증한다.
    return this.usersService.create(createUserDto);
  }

  @Get(':loginId')
  //TODO: Library-specific approach 코드 수정하기
  async findUser(@Param('loginId') loginId: string, @Res() response) {
    const foundUser = await this.usersService.findUserByLoginId(loginId);
    response
      .status(HttpStatus.OK)
      .json({ result: foundUser?.loginId !== undefined });
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
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
