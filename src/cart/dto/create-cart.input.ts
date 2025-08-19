import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { ShippingAddressDto } from 'src/users/dto/createUser.dto';
import { Column, ForeignKey, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateCartInput {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID, { nullable: true })
  cart_id: string;
  @Field()
  @ForeignKey(() => String)
  user_id: string;
  @Column()
  @Field(() => [Book], { nullable: true })

  items: Book[];
  @Column({ generated: 'uuid' })
  @Field(() => ShippingAddressDto, { nullable: true })
  shipping_address: ShippingAddressDto;
}
