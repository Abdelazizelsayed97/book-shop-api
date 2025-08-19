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

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      description: 'أحدث هواتف آبل مع كاميرا متطورة',
      price: 999.99,
      stock: 50,
      category: 'هواتف',
      brand: 'Apple',
      image: 'https://example.com/iphone15.jpg',
      rating: 4.8,
      reviewCount: 1250,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      description: 'هاتف سامسونج الجديد مع الذكاء الاصطناعي',
      price: 899.99,
      stock: 75,
      category: 'هواتف',
      brand: 'Samsung',
      image: 'https://example.com/galaxy-s24.jpg',
      rating: 4.6,
      reviewCount: 890,
      isActive: true,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: 3,
      name: 'MacBook Pro M3',
      description: 'لابتوب احترافي مع معالج M3',
      price: 1999.99,
      stock: 25,
      category: 'لابتوبات',
      brand: 'Apple',
      image: 'https://example.com/macbook-pro.jpg',
      rating: 4.9,
      reviewCount: 567,
      isActive: true,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
    },
    {
      id: 4,
      name: 'Dell XPS 13',
      description: 'لابتوب رفيع وخفيف للعمل',
      price: 1299.99,
      stock: 40,
      category: 'لابتوبات',
      brand: 'Dell',
      image: 'https://example.com/dell-xps.jpg',
      rating: 4.5,
      reviewCount: 432,
      isActive: true,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
    },
    {
      id: 5,
      name: 'AirPods Pro',
      description: 'سماعات لاسلكية مع إلغاء الضوضاء',
      price: 249.99,
      stock: 100,
      category: 'سماعات',
      brand: 'Apple',
      image: 'https://example.com/airpods-pro.jpg',
      rating: 4.7,
      reviewCount: 2100,
      isActive: true,
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12'),
    },
  ];

  create(createProductInput: CreateProductInput): Product {
    const newProduct: Product = {
      id: this.products.length + 1,
      ...createProductInput,
      rating: createProductInput.rating || 0,
      reviewCount: createProductInput.reviewCount || 0,
      isActive: createProductInput.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.products.push(newProduct);
    return newProduct;
  }

  findAll(
    filter?: ProductFilterInput,
    pagination?: PaginationInput,
    sort?: ProductSortInput,
  ): PaginatedProducts {
    let filteredProducts = [...this.products];

    if (filter) {
      if (filter.searchKey) {
        const searchTerm = filter.searchKey.toLowerCase();
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm),
        );
      }

      if (filter.category) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === filter.category,
        );
      }

      if (filter.brand) {
        filteredProducts = filteredProducts.filter(
          (product) => product.brand === filter.brand,
        );
      }

      if (filter.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= filter.minPrice!,
        );
      }

      if (filter.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= filter.maxPrice!,
        );
      }

      if (filter.minRating !== undefined) {
        filteredProducts = filteredProducts.filter(
          (product) => (product.rating || 0) >= filter.minRating!,
        );
      }

      if (filter.inStock !== undefined) {
        filteredProducts = filteredProducts.filter((product) =>
          filter.inStock ? product.stock > 0 : product.stock === 0,
        );
      }

      if (filter.isActive !== undefined) {
        filteredProducts = filteredProducts.filter(
          (product) => product.isActive === filter.isActive,
        );
      }
    }

    // تطبيق الترتيب
    if (sort?.sortBy) {
      filteredProducts.sort((a, b) => {
        let aValue: any = a[sort.sortBy!];
        let bValue: any = b[sort.sortBy!];

        if (sort.sortOrder === 'DESC') {
          [aValue, bValue] = [bValue, aValue];
        }

        if (typeof aValue === 'string') {
          return aValue.localeCompare(bValue);
        }
        return aValue - bValue;
      });
    }

    // تطبيق الترقيم
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const total = filteredProducts.length;
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
      products: paginatedProducts,
      pagination: paginationInfo,
    };
  }

  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`المنتج برقم ${id} غير موجود`);
    }
    return product;
  }

  update(id: number, updateProductInput: UpdateProductInput): Product {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new NotFoundException(`المنتج برقم ${id} غير موجود`);
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductInput,
      updatedAt: new Date(),
    };

    return this.products[productIndex];
  }

  remove(id: number): Product {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new NotFoundException(`المنتج برقم ${id} غير موجود`);
    }

    const removedProduct = this.products[productIndex];
    this.products.splice(productIndex, 1);
    return removedProduct;
  }

  // وظائف إضافية مفيدة
  getCategories(): string[] {
    return [...new Set(this.products.map((product) => product.category))];
  }

  getBrands(): string[] {
    return [...new Set(this.products.map((product) => product.brand))];
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter((product) => product.category === category);
  }

  getProductsByBrand(brand: string): Product[] {
    return this.products.filter((product) => product.brand === brand);
  }

  searchProducts(query: string): Product[] {
    const searchTerm = query.toLowerCase();
    return this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm),
    );
  }
}
