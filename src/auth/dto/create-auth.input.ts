import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RoleEnum } from 'src/utils/eums';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Field({ defaultValue: RoleEnum.USER })
  role: RoleEnum;
}

@InputType({
  description: 'Input should be as string trimed to success the operation',
})
export class LoginDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

@InputType()
export class ForgotPasswordDto {
  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class ResetPasswordDto {
  @Field()
  @IsNotEmpty()
  token: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}

@InputType()
export class VerifyOtpDto {
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  otpCode: string;
}

@InputType()
export class ResendOtpDto {
  @Field()
  @IsEmail()
  email: string;
}
