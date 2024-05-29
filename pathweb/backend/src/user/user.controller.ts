import { Controller, Get, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}