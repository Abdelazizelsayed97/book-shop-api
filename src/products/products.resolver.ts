import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import {
  ProductFilterInput,
  PaginationInput,
  ProductSortInput,
} from './dto/filter-product.input';
import { PaginatedProducts } from './entities/pagination.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => PaginatedProducts, { name: 'products' })
  findAll(
    @Args('filter', { nullable: true }) filter?: ProductFilterInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
    @Args('sort', { nullable: true }) sort?: ProductSortInput,
  ) {
    return this.productsService.findAll(filter, pagination, sort);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }

  // استعلامات إضافية مفيدة
  @Query(() => [String], { name: 'categories' })
  getCategories() {
    return this.productsService.getCategories();
  }

  @Query(() => [String], { name: 'brands' })
  getBrands() {
    return this.productsService.getBrands();
  }

  @Query(() => [Product], { name: 'productsByCategory' })
  getProductsByCategory(@Args('category') category: string) {
    return this.productsService.getProductsByCategory(category);
  }

  @Query(() => [Product], { name: 'productsByBrand' })
  getProductsByBrand(@Args('brand') brand: string) {
    return this.productsService.getProductsByBrand(brand);
  }

  @Query(() => [Product], { name: 'searchProducts' })
  searchProducts(@Args('query') query: string) {
    return this.productsService.searchProducts(query);
  }
}
