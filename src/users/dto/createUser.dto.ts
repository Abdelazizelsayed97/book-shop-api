import { InputType, Field, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  ValidateNested,
  IsPostalCode,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoleEnum } from 'src/utils/eums';

@ObjectType('ShippingAddress')
@InputType('ShippingAddressInput')
export class ShippingAddressDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  street: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  state?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsPostalCode('any')
  postalCode: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  country: string;
}

@InputType()
export class CreateUserDto {
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
  @IsPhoneNumber('EG')
  phone: string;

  @Field(() => ShippingAddressDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress?: ShippingAddressDto;

  @Field(() => String)
  @IsEnum(RoleEnum)
  role?: RoleEnum;
}
