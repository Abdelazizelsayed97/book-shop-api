import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { BooksModule } from './books/books.module';
import { CreatorsModule } from './creators/creators.module';
import { SearchModule } from './search/search.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: true,
            graphiql: true,
            introspection: true,
        }),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                type: 'postgres',
                host: cfg.get<string>('POSTGRES_HOST', 'localhost'),
                port: Number(cfg.get<number>('POSTGRES_PORT', 5432)),
                username: cfg.get<string>('POSTGRES_USER', 'postgres'),
                password: cfg.get<string>('POSTGRES_PASSWORD', 'KareemAlsayed1997@#'),
                database: cfg.get<string>('POSTGRES_DB', 'postgres'),
                // either autoLoadEntities or use glob pattern to include compiled .js files
                autoLoadEntities: true,
                synchronize: cfg.get('TYPEORM_SYNC', 'true') === 'true',
                logging: cfg.get('TYPEORM_LOGGING', 'false') === 'true',
            }),
        }),

        // module-level repositories will be added in each feature module
        AuthModule,
        UsersModule,
        CartModule,
        ProductsModule,
        BooksModule,
        CreatorsModule,
        SearchModule,
        OrderModule,
    ],
})
export class AppModule { }
