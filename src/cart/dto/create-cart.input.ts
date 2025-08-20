import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { CreateBookInput } from 'src/books/dto/create-book.input';
import { Book } from 'src/books/entities/book.entity';
import { ShippingAddressDto } from 'src/users/dto/createUser.dto';
import { Column, ForeignKey, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateCartInput {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { nullable: true })
  cart_id: string;
  @Field()
  @ForeignKey(() => String)
  user_id: string;
  @Column()
  @Field(() => [CreateBookInput], { nullable: true })
  items: CreateBookInput[];
  @Column({ generated: 'uuid' })
  @Field(() => ShippingAddressDto, { nullable: true })
  shipping_address: ShippingAddressDto;
}
