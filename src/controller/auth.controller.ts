import { Controller, Get, Request, Post, Body, UseGuards,Query,  Param, Options, Delete, ClassSerializerInterceptor, UseInterceptors, Put, HttpService } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Public } from 'src/auth/metadata';
import { UserRegisterDTO } from 'src/user/dto/user.register.dto';
import { UserService } from 'src/user/user.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService, private usersService: UserService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/login') 
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register') 
  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  async register(@Body() dto: UserRegisterDTO) {
    return this.authService.register(dto);
  }
  
  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@Request() req) {
    return this.usersService.findOneBy({id: req.user.userId});
  }
  
  @Delete('auth/logout')
  @Public()
  logout() {
    return true;
  }
}