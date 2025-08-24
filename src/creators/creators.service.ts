import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCreatorInput } from './dto/create-creator.input';
import { UpdateCreatorInput } from './dto/update-creator.input';
import { Creator } from './entities/creator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectRepository(Creator)
    private readonly creatorRepository: Repository<Creator>,
  ) { }

  create(createCreatorInput: CreateCreatorInput): Promise<Creator> {
    const newCreator = this.creatorRepository.create(createCreatorInput);
    return this.creatorRepository.save(newCreator);
  }

  findAll(): Promise<Creator[]> {
    return this.creatorRepository.find({ relations: ['books'] });
  }

  findManyByIds(ids: string[]): Promise<Creator[]> {
    return this.creatorRepository.find({ where: { id: In(ids) } });
  }

  async findOne(id: string): Promise<Creator> {
    const creator = await this.creatorRepository.findOne({ where: { id }, relations: ['books'] });
    if (!creator) {
      throw new NotFoundException(`Creator with id ${id} not found`);
    }
    return creator;
  }

  async findByName(name: string): Promise<Creator> {
    const creator = await this.creatorRepository.findOne({ where: { name } });
    if (!creator) {
      throw new NotFoundException(`No creator found with name: ${name}`);
    }
    return creator;
  }

  async update(id: string, updateCreatorInput: UpdateCreatorInput): Promise<Creator> {
    const creator = await this.creatorRepository.preload({

      books_ids: updateCreatorInput.books_ids,
      ...updateCreatorInput,
    });
    if (!creator) {
      throw new NotFoundException(`No creator found with id: ${id}`);
    }
    return this.creatorRepository.save(creator);
  }

  async remove(id: string): Promise<void> {
    const result = await this.creatorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`No creator found with id: ${id}`);
    }
  }
}
