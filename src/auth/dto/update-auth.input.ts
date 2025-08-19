import { RegisterDto } from './create-auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(RegisterDto) {
  @Field(() => Int)
  id: number;
}
