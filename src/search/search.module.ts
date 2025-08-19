import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';
import { CreatorsModule } from 'src/creators/creators.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [CreatorsModule, BooksModule],
  providers: [SearchResolver, SearchService],
  exports: [SearchService],
})
export class SearchModule {}
