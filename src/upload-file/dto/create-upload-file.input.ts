import { InputType, Field } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateUploadFileInput {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'Example field (placeholder)' })
  id: string;
  @Field()
  @Column()
  path: string;
}
