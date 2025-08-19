import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  emailVerificationToken?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  emailVerificationExpires?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  resetPasswordToken?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  resetPasswordExpires?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  otpCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  otpExpires?: Date;
}
