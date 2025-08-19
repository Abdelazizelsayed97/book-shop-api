import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserWithoutPassword {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  isEmailVerified?: boolean;

  @Field({ nullable: true })
  emailVerificationToken?: string;

  @Field({ nullable: true })
  emailVerificationExpires?: Date;

  @Field({ nullable: true })
  resetPasswordToken?: string;

  @Field({ nullable: true })
  resetPasswordExpires?: Date;

  @Field({ nullable: true })
  otpCode?: string;

  @Field({ nullable: true })
  otpExpires?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class AuthResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  token?: string;

  @Field(() => UserWithoutPassword, { nullable: true })
  user?: UserWithoutPassword;
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
