import { CreateCreatorInput } from './create-creator.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCreatorInput extends PartialType(CreateCreatorInput) {
  @Field()
  id: string;
}
