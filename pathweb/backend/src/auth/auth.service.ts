import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.id,  // userId를 응답에 포함
    };
  }

  async register(userDto: SignupDto) {
    const existingUser = await this.usersService.findOneByUsername(userDto.username);
    const existingEmail = await this.usersService.findOneByEmail(userDto.email);
    if (existingUser || existingEmail) {
      throw new ConflictException('Username or email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    return this.usersService.create(userDto.username, hashedPassword, userDto.name, userDto.email, userDto.role);
  }
}
