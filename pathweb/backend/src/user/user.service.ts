// src/user/user.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    user.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.save(user);
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  // async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
  //   const { username, password } = loginUserDto;
  //   const user = await this.userRepository.findOne({ where: { username } });
  //
  //   if (!user) {
  //     console.log('User not found');
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //
  //   const isPasswordValid = await bcrypt.compare(password, user.password);
  //   if (!isPasswordValid) {
  //     console.log('Invalid password');
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //
  //   console.log('Login successful');
  //   return user;
  // }
}
