import { InputType, Field } from '@nestjs/graphql';
import { BookInterface } from '../entities/book.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType({
  description:
    'This mutation responsable to add a new book to the libarary, all field are required ',
})
export class CreateBookInput implements BookInterface {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  book_id: string;
  @Field(() => String)
  @Column()
  title: string;
  @Field(() => String)
  @Column()
  year: string;
  @Field(() => Boolean)
  @Column()
  isBorrowed: boolean;
  @Field(() => [String])
  @Column("text", { array: true })
  creatorId: string;
}
