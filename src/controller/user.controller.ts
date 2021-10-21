import { Controller, Body, Param, Put, Res, Req, Get } from '@nestjs/common';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('api/users')
@Controller()
export class UserController {
  constructor(private usersService: UserService) {}

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.usersService.update(+req.user.userId, updateUserDto);
  }
}
