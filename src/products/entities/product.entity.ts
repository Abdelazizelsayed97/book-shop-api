import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Float)
  @Column('float')
  price: number;

  @Field(() => Int)
  @Column()
  stock: number;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  brand: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field(() => Float, { nullable: true })
  @Column('float', { nullable: true })
  rating?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  reviewCount?: number;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
