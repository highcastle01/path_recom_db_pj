import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserRole } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(username: string, password: string, name: string, email: string, role: string): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      username,
      password,
      name,
      email,
      role: UserRole[role.toUpperCase() as keyof typeof UserRole],
    });
    return this.userRepository.save(newUser);
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
