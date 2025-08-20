import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatorsService } from 'src/creators/creators.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly creatorsService: CreatorsService,
  ) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const creators = await this.creatorsService.findManyByIds(
      createBookInput.creatorIds,
    );
    const newBook = this.bookRepository.create({
      ...createBookInput,
      creator: creators,
    });
    return this.bookRepository.save(newBook);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['creators'] });
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { book_id: id },
      relations: ['creators'],
    });
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  async findByName(bookTitle: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { title: bookTitle },
    });
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  async update(input: UpdateBookInput): Promise<Book> {
    const book = await this.findOne(input.book_id);
    if (!book) {
      throw new Error('Book not found');
    }
    Object.assign(book, input);
    return this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
