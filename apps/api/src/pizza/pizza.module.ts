import { Module } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { PizzaController } from './pizza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaSchema } from './db/pizza/pizza.schema';
import { PizzaSchemaFactory } from './db/pizza/pizza-schema.factory';
import { PizzaRepository } from './db/pizza/pizza.repository';
import { OrderedPizzaSchemaFactory } from './db/ordered-pizza/ordered-pizza-schema.factory';
import { OrderSchemaFactory } from './db/orders/order-schema.factory';
import { OrderFactory } from './entities/order/order.factory';
import { PendingPizzaFactory } from './entities/pending-pizza/pending-pizza.factory';
import { UsersModule } from 'src/users/users.module';
import { OrderRepository } from './db/orders/order.repository';
import { OrderSchema } from './db/orders/order.schema';
import { OrderedPizzaSchema } from './db/ordered-pizza/ordered-pizza.schema';
import { PizzaDtoFactory } from './dto/pizza/pizza-dto.factory';
import { OrderedPizzaDtoFactory } from './dto/ordered-pizza/ordered-pizza-dto.factory';
import { OrderDtoFactory } from './dto/order/order-dto.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([PizzaSchema, OrderSchema, OrderedPizzaSchema]),
    UsersModule,
  ],
  controllers: [PizzaController],
  providers: [
    PizzaService,
    PizzaSchemaFactory,
    PizzaRepository,
    OrderedPizzaSchemaFactory,
    OrderSchemaFactory,
    OrderFactory,
    PendingPizzaFactory,
    OrderRepository,
    PizzaDtoFactory,
    OrderedPizzaDtoFactory,
    OrderDtoFactory,
  ],
})
export class PizzaModule {}
