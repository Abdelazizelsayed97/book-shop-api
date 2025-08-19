import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

@InputType()
export class ProductFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  searchKey?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  brand?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  minRating?: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  inStock?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isActive?: boolean;
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @Field(() => Int, { defaultValue: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

@InputType()
export class ProductSortInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt';

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';
}
