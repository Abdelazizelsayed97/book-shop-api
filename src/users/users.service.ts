import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findByID(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id: id } }) || null;
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email: email } }) || null;
  }
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      ...createUserDto,
      isEmailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findByID(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    user.updatedAt = new Date();
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findByID(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }


    await this.userRepository.remove(user);
    return true;
  }

}
