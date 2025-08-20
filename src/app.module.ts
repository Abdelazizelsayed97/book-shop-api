import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';

import { BooksModule } from './books/books.module';
import { CreatorsModule } from './creators/creators.module';
import { SearchModule } from './search/search.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from './books/entities/book.entity';
import { Creator } from './creators/entities/creator.entity';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { Cart } from './cart/entities/cart.entity';
import { Order } from './order/entities/order.entity';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: true,
            graphiql: true,
            introspection: true,
        }),
        // create the DataSource provider
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST || 'localhost',
            port: Number(process.env.POSTGRES_PORT || 5432),
            username: process.env.POSTGRES_USER || 'postgres',
            password: process.env.POSTGRES_PASSWORD || 'KareemAlsayed1997@#',
            database: process.env.POSTGRES_DB || 'postgres',
            entities: [UserEntity, Creator, Book, Cart, Order],
            synchronize: true,
        }),
        // register repositories/entities for injection
        TypeOrmModule.forFeature([UserEntity, Creator, Book, Cart, Order]),
        AuthModule,
        UsersModule,
        CartModule,
        ProductsModule,
        BooksModule,
        CreatorsModule,
        SearchModule,
        OrderModule,
    ],
    providers: [],
})
export class AppModule {
    constructor() {
        console.log('AppModule constructor');
    }
}
