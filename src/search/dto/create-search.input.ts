import { InputType, Int, Field } from '@nestjs/graphql';
import { PaginationInput } from 'src/products/dto/filter-product.input';

@InputType()
export class SearchInput {
  @Field(() => String)
  searchKey: string;
  @Field(() => PaginationInput)
  paginate: PaginationInput;
}
