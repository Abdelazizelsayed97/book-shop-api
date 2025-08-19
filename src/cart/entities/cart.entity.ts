import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { ShippingAddressDto } from 'src/users/dto/createUser.dto';

@ObjectType()
export class Cart {
  @Field(() => String)
  cart_id: string;

  @Field(() => String)
  user_id: string;

  @Field(() => [Book])
  items: Book[];

  @Field(() => ShippingAddressDto)
  shipping_address: ShippingAddressDto;
}
