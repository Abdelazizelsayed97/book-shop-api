import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { SearchInput } from './dto/create-search.input';
import { SearchResultUnion } from './entities/search.types';

@Resolver(() => SearchResultUnion)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [SearchResultUnion], { name: 'search' })
  async findAll(
    @Args('searchInput', { type: () => SearchInput }) searchInput: SearchInput,
  ) {
    return await this.searchService.findAll(searchInput);
  }

  @Mutation(() => Boolean, { name: 'clearSearchHistory' })
  async removeSearchHistory(
    @Args('searchInput', { type: () => SearchInput }) searchInput: SearchInput,
  ) {
    return await this.searchService.removeSearchHistory(searchInput);
  }
}
