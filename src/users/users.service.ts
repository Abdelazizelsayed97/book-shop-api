import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly users: Repository<UserEntity>;

  async findAll(): Promise<UserEntity[]> {
    return await this.users.find();
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return this.users.findOne({ where: { id } }) || null;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.users.create({
      ...createUserDto,
      isEmailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    });
    await this.users.save(newUser);
    return newUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    user.updatedAt = new Date();
    await this.users.save(user);
    return user;
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.users.remove(user);
    return true;
  }

}
