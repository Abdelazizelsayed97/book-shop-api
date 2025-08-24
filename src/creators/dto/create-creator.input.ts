import { InputType, Field } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { Column } from 'typeorm';

@InputType()
export class CreateCreatorInput {
  @Field()
  name: string;

  @Field(() => [String])
  @Column('text', { array: true })

  books_ids: string[];
}
