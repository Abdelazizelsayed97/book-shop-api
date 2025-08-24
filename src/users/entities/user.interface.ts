import { InterfaceType, Field, ID } from '@nestjs/graphql';
import { RoleEnum } from 'src/utils/eums';

@InterfaceType()
export abstract class IUser {
  @Field(() => ID)
  id: string;

  // @Field()
  // name: string;
  @Field()
  role: RoleEnum = RoleEnum.USER;
}
