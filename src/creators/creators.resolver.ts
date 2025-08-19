import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreatorsService } from './creators.service';
import { Creator } from './entities/creator.entity';
import { CreateCreatorInput } from './dto/create-creator.input';
import { UpdateCreatorInput } from './dto/update-creator.input';

@Resolver(() => Creator)
export class CreatorsResolver {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Mutation(() => Creator)
  createCreator(
    @Args('createCreatorInput') createCreatorInput: CreateCreatorInput,
  ) {
    return this.creatorsService.create(createCreatorInput);
  }

  @Query(() => [Creator], { name: 'creators' })
  findAll() {
    return this.creatorsService.findAll();
  }

  @Query(() => Creator, { name: 'creator' })
  findOne(@Args('id') id: string) {
    return this.creatorsService.findOne(id);
  }

  @Mutation(() => Creator)
  updateCreator(
    @Args('updateCreatorInput') updateCreatorInput: UpdateCreatorInput,
  ) {
    return this.creatorsService.update(
      updateCreatorInput.id,
      updateCreatorInput,
    );
  }

  @Mutation(() => Creator)
  removeCreator(@Args('id') id: string) {
    return this.creatorsService.remove(id);
  }
}
