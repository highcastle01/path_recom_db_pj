// // src/user/user.controller.ts
// import { Controller, Post, Body, Req, UseGuards, Get  } from '@nestjs/common';
// import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { LoginUserDto } from './dto/login-user.dto';
// import { AuthGuard } from '@nestjs/passport';
//
// @Controller('users')
// export class UserController {
//   constructor(private readonly userService: UserService) {}
//
//   // @Post('signup')
//   // async create(@Body() createUserDto: CreateUserDto) {
//   //   return this.userService.create(createUserDto);
//   // }
//
//   // @Post('login')
//   // async login(@Body() loginUserDto: LoginUserDto) {
//   //   try {
//   //     const user = await this.userService.login(loginUserDto);
//   //     return {
//   //       statusCode: 200,
//   //       message: 'Login successful',
//   //       user,
//   //     };
//   //   } catch (error) {
//   //     throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
//   //   }
//   // }
//
//   @UseGuards(AuthGuard('local'))
//   @Post('login')
//   async login(@Req() req) {
//     return {
//       statusCode: 200,
//       message: 'Login successful',
//       user: req.user,
//     };
//   }
//
//   @Get('profile')
//   getProfile(@Req() req) {
//     return req.user;
//   }
// }

import { Controller, Get, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}