import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  order_id: string;

  @Field(() => String)
  @Column()
  user_id: string;

  @Field(() => [String])
  @Column('text', { array: true })
  itemIds: string[];

  @Field(() => Float)
  @Column('float')
  total_price: number;

  @Field(() => String)
  @Column()
  status: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
