import { createUnionType } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { Creator } from 'src/creators/entities/creator.entity';

export const SearchResultUnion = createUnionType({
  name: 'SearchResult',
  types: () => [Creator, Book] as const,
  resolveType(value) {
    return value instanceof Book ? 'Book' : 'Creator';
  },
});
