import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
  ) { }

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const cart = await this.cartService.findOne(createOrderInput.cartId);
    const newOrder = this.orderRepository.create({ ...createOrderInput, itemIds: cart.items.map(item => item.book_id) });
    return this.orderRepository.save(newOrder);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['items'] });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { order_id: id }, relations: ['items'] });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderInput: UpdateOrderInput): Promise<Order> {
    const order = await this.orderRepository.preload({
      order_id: id,
      ...updateOrderInput,
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return this.orderRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  }
}
