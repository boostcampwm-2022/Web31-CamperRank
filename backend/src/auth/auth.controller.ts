import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from '../users/dto/auth-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() authUserDto: AuthUserDto) {
    return this.authService.login(authUserDto);
  }

  // jwt 인증을 위한 useGuards + AuthGuard .. passport 활용
  // 토큰이 없거나 일치하지 않으면 401
  @Post('/authTest')
  @UseGuards(AuthGuard())
  authTest(@Req() req) {
    console.log(req.user);
    return req.user;
  }
}
