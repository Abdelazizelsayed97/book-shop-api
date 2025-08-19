import { Injectable } from '@nestjs/common';
import { CreateCreatorInput } from './dto/create-creator.input';
import { UpdateCreatorInput } from './dto/update-creator.input';
import { Creator } from './entities/creator.entity';
import { RoleEnum } from 'src/utils/eums';

@Injectable()
export class CreatorsService {
  creators: Creator[] = [];
  create(createCreatorInput: CreateCreatorInput) {
    this.creators.push({
      ...createCreatorInput,
      id: Date.now().toString(),
      books: [],
      role: RoleEnum.USER,
    });
    return 'This action adds a new creator';
  }

  findAll() {
    return this.creators;
  }
  findManyByIds(ids: string[]) {
    return this.creators.filter((creator) => ids.includes(creator.id));
  }
  findOne(id: string) {
    return this.creators.find((creator) => creator.id === id);
  }
  findByName(name: string) {
    const matchedCreator = this.creators.find(
      (creator) => creator.name === name,
    );
    return matchedCreator
      ? matchedCreator
      : `No creator found with name: ${name}`;
  }

  update(id: string, updateCreatorInput: UpdateCreatorInput) {
    const creatorIndex = this.creators.findIndex(
      (creator) => creator.id === id,
    );
    if (creatorIndex === -1) {
      return `No creator found with id: ${id}`;
    }
    this.creators[creatorIndex] = {
      ...this.creators[creatorIndex],
      ...updateCreatorInput,
    };
    return this.creators[creatorIndex];
  }

  remove(id: string) {
    const creatorIndex = this.creators.findIndex(
      (creator) => creator.id === id,
    );
    if (creatorIndex === -1) {
      return `No creator found with id: ${id}`;
    }
    const removedCreator = this.creators.splice(creatorIndex, 1);
    return removedCreator[0];
  }
}
