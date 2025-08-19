import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { CreatorsModule } from 'src/creators/creators.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), CreatorsModule],
  providers: [BooksResolver, BooksService],
  exports: [BooksResolver, BooksService],
})
export class BooksModule {}
