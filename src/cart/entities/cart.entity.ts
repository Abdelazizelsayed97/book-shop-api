import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { ShippingAddressDto } from 'src/users/dto/createUser.dto';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@ObjectType()
@Entity()
export class Cart {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  cart_id: string;

  @Field(() => String)
  @Column()
  user_id: string;

  @Field(() => [Book])
  @ManyToMany(() => Book)
  @JoinTable()
  items: Book[];

  @Field(() => ShippingAddressDto)
  @Column('jsonb')
  shipping_address: ShippingAddressDto;
}
