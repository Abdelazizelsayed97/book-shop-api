import { InputType, Field } from '@nestjs/graphql';
import { BookInterface } from '../entities/book.entity';

@InputType({
  description:
    'This mutation responsable to add a new book to the libarary, all field are required ',
})
export class CreateBookInput extends BookInterface {
  @Field(() => [String])
  creatorIds: string[];
}
