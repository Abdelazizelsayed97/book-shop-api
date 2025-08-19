import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from '../../users/entities/user.interface';
import { RoleEnum } from 'src/utils/eums';

@ObjectType({ implements: () => IUser })
@Entity('creators')
export class Creator implements IUser {
  role: RoleEnum;
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [Book])
  @ManyToMany(() => Book, (book) => book.creator)
  @JoinTable()
  books: Book[];
}
