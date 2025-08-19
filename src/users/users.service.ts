import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { RoleEnum } from 'src/utils/eums';

@Injectable()
export class UsersService {
  private readonly users: UserEntity[] = [];

  findAll(): UserEntity[] {
    return this.users;
  }

  findOne(id: string): UserEntity | null {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }

  create(createUserDto: CreateUserDto): UserEntity {
    const newUser: UserEntity = {
      id: String(this.users.length + 1),
      ...createUserDto,
      isEmailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: `${createUserDto.firstName} ${createUserDto.lastName}`.trim(),
      role: createUserDto.role || RoleEnum.USER,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto): UserEntity {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...updateUserDto,
      id, // Ensure ID doesn't change
      updatedAt: new Date(),
      name: `${updateUserDto.firstName} ${updateUserDto.lastName}`.trim(),
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: string): boolean {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}
