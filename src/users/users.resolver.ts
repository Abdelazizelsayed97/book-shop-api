import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserEntity], { name: 'getUsers' })
  getUsers(): UserEntity[] {
    return this.usersService.findAll();
  }

  @Query(() => UserEntity, { name: 'getUser', nullable: true })
  getUser(@Args('id') id: string): UserEntity | null {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserEntity, { name: 'createUser' })
  createUser(@Args('input') input: CreateUserDto): UserEntity {
    return this.usersService.create(input);
  }

  @Mutation(() => UserEntity, { name: 'updateUser' })
  async updateUser(@Args('input') input: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.update(input.id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  deleteUser(@Args('id') id: string): boolean {
    return this.usersService.remove(id);
  }
}
