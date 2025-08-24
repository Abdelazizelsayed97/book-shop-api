import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly booksService: BooksService,
  ) { }

  async create(createCartInput: CreateCartInput): Promise<Cart> {
    const books = await this.booksService.findManyByIds(createCartInput.items.map(item => item.book_id));
    const newCart = this.cartRepository.create({ ...createCartInput, items: books });
    return this.cartRepository.save(newCart);
  }

  findAll(): Promise<Cart[]> {
    return this.cartRepository.find({ relations: ['items'] });
  }

  async findOne(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { cart_id: id }, relations: ['items'] });
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }
    return cart;
  }

  async update(id: string, updateCartInput: UpdateCartInput): Promise<Cart> {
    const cart = await this.cartRepository.preload({
      cart_id: id,
      ...updateCartInput,
    });
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }
    return this.cartRepository.save(cart);
  }

  async remove(id: string): Promise<void> {
    const result = await this.cartRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }
  }
}
