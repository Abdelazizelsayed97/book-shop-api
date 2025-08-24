import { InputType, Field } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, ForeignKey, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateOrderInput {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Order ID' })
  id: string;

  @Column()
  @Field(() => String)
  cartId: string;

  @Column()
  @ForeignKey(() => UserEntity)
  @Field(() => String)
  userId: string;
}
