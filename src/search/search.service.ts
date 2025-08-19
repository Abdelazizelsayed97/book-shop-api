import { Injectable } from '@nestjs/common';
import { SearchInput } from './dto/create-search.input';

import { CreatorsService } from 'src/creators/creators.service';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly creatorsService: CreatorsService,
    private readonly booksService: BooksService,
  ) {}

  async findAll(searchInput: SearchInput) {
    const [creators, books] = await Promise.all([
      this.creatorsService.findByName(searchInput.searchKey),
      this.booksService.findByName(searchInput.searchKey),
    ]);

    return [creators, books];
  }

  async removeSearchHistory(searchInput: SearchInput) {
    return `This action removes a #${searchInput} search`;
  }
}
