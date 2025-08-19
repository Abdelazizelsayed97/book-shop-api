import { ObjectType, Field, InterfaceType } from '@nestjs/graphql';
import { Creator } from 'src/creators/entities/creator.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';


@InterfaceType()
export class BookInterface {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  book_id: string;
  @Field()
  @Column()
  title: string;
  @Field()
  @Column()
  year: string;
  @Field()
  @Column()
  isBorrowed: boolean;

}

@ObjectType()
@Entity({
  name: 'books',
})
export class Book extends BookInterface {
  @Field(() => [Creator])
  @JoinTable()
  @ManyToMany(() => Creator, (creator) => creator.books)
  creator: Creator[];

}
