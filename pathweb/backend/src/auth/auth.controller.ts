import { Controller, Request, Get, Post, UseGuards, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { username, password } = loginDto;
    console.log('Attempting login for user:', username); // 로그인 시도 로그
    try {
      const token = await this.authService.login(loginDto);
      res.cookie('jwt', token.access_token, { httpOnly: true });
      console.log('Login successful for user:', username); // 로그인 성공 로그
      return res.send(token);
    } catch (error) {
      console.error('Login failed for user:', username, 'Error:', error.message); // 로그인 실패 로그
      return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Login failed' });
    }
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const { username, password, name, email, role } = signupDto;
    try {
      console.log('Signup success : ', username);
      return this.authService.register(signupDto);
    } catch (error){
      console.log('Signup fail : ', username);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  getStatus(@Request() req) {
    console.log('Session status check for user:', req.user?.username); // 세션 상태 확인 로그
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    console.log('Fetching user info for user:', req.user?.username);
    return req.user; // 또는 데이터베이스에서 사용자 정보를 불러오는 로직 추가
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    console.log('User logged out');
    return res.send({ message: 'Logged out' });
  }
}