import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import {
  ProductFilterInput,
  PaginationInput,
  ProductSortInput,
} from './dto/filter-product.input';
import { Product } from './entities/product.entity';
import {
  PaginatedProducts,
  PaginationInfo,
} from './entities/pagination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  create(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct = this.productRepository.create(createProductInput);
    return this.productRepository.save(newProduct);
  }

  async findAll(
    filter?: ProductFilterInput,
    pagination?: PaginationInput,
    sort?: ProductSortInput,
  ): Promise<PaginatedProducts> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (filter) {
      if (filter.searchKey) {
        queryBuilder.andWhere(
          '(product.name ILIKE :search OR product.description ILIKE :search OR product.brand ILIKE :search)',
          { search: `%${filter.searchKey}%` },
        );
      }

      if (filter.category) {
        queryBuilder.andWhere('product.category = :category', {
          category: filter.category,
        });
      }

      if (filter.brand) {
        queryBuilder.andWhere('product.brand = :brand', { brand: filter.brand });
      }

      if (filter.minPrice !== undefined) {
        queryBuilder.andWhere('product.price >= :minPrice', {
          minPrice: filter.minPrice,
        });
      }

      if (filter.maxPrice !== undefined) {
        queryBuilder.andWhere('product.price <= :maxPrice', {
          maxPrice: filter.maxPrice,
        });
      }

      if (filter.minRating !== undefined) {
        queryBuilder.andWhere('product.rating >= :minRating', {
          minRating: filter.minRating,
        });
      }

      if (filter.inStock !== undefined) {
        queryBuilder.andWhere(filter.inStock ? 'product.stock > 0' : 'product.stock = 0');
      }

      if (filter.isActive !== undefined) {
        queryBuilder.andWhere('product.isActive = :isActive', {
          isActive: filter.isActive,
        });
      }
    }

    if (sort?.sortBy) {
      queryBuilder.orderBy(`product.${sort.sortBy}`, sort.sortOrder || 'ASC');
    }

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const [products, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    const paginationInfo: PaginationInfo = {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };

    return {
      products,
      pagination: paginationInfo,
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`المنتج برقم ${id} غير موجود`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.productRepository.preload({

      ...updateProductInput,
    });

    if (!product) {
      throw new NotFoundException(`المنتج برقم ${id} غير موجود`);
    }
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<Product> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return product;
  }

  async getCategories(): Promise<string[]> {
    const categories = await this.productRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .getRawMany();
    return categories.map((c) => c.category);
  }

  async getBrands(): Promise<string[]> {
    const brands = await this.productRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.brand', 'brand')
      .getRawMany();
    return brands.map((b) => b.brand);
  }

  getProductsByCategory(category: string): Promise<Product[]> {
    return this.productRepository.find({ where: { category } });
  }

  getProductsByBrand(brand: string): Promise<Product[]> {
    return this.productRepository.find({ where: { brand } });
  }

  searchProducts(query: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .where(
        'product.name ILIKE :query OR product.description ILIKE :query OR product.brand ILIKE :query',
        { query: `%${query}%` },
      )
      .getMany();
  }
}
