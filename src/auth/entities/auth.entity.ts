import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column } from 'typeorm';

@ObjectType()
export class UserWithoutPassword extends UserEntity {
  @Field()
  @Column()
  token: string;
}

@ObjectType()
export class AuthResponse {
  constructor(data: any) {
    this.success = data.success;
    this.message = data.message;
    this.token = data.token;
    this.user = data.user;
  }
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  token?: string;

  @Field(() => UserEntity, { nullable: true })
  user?: UserEntity;
}

@ObjectType()
export class OtpResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  otpId?: string;
}
