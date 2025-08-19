import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCreatorInput {
  @Field()
  name: string;
}
