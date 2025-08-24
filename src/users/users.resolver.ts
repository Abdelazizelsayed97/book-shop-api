import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [UserEntity], { name: 'getUsers' })
  async getUsers(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Query(() => UserEntity, { name: 'getUser', nullable: true })
  async getUser(@Args('id') id: string): Promise<UserEntity | null> {
    return this.usersService.findByID(id);
  }

  @Mutation(() => UserEntity, { name: 'createUser' })
  async createUser(@Args('input') input: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(input);
  }

  @Mutation(() => UserEntity, { name: 'updateUser' })
  async updateUser(@Args('input') input: UpdateUserDto): Promise<UserEntity> {
    return await this.usersService.update(input.id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return await this.usersService.remove(id);
  }
}
