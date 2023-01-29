import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderedPizzaSchema } from 'src/pizza/db/ordered-pizza/ordered-pizza.schema';
import { OrderSchema } from 'src/pizza/db/orders/order.schema';
import { PizzaSchema } from 'src/pizza/db/pizza/pizza.schema';
import { UserSchema } from 'src/users/db/user/user.schema';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        database: configService.get<string>('DB_NAME'),
        entities: [UserSchema, PizzaSchema, OrderedPizzaSchema, OrderSchema],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
