import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { Order } from 'src/pizza/entities/order/order';
import { UserSchemaFactory } from 'src/users/db/user/user-schema.factory';
import { OrderedPizzaSchemaFactory } from '../ordered-pizza/ordered-pizza-schema.factory';
import { OrderSchema } from './order.schema';

@Injectable()
export class OrderSchemaFactory
  implements EntitySchemaFactory<OrderSchema, Order>
{
  constructor(
    private orderedPizzaSchemaFactory: OrderedPizzaSchemaFactory,
    private userSchemaFactory: UserSchemaFactory,
  ) {}

  create(entity: Order): OrderSchema {
    return {
      user: this.userSchemaFactory.create(entity.getUser()),
      orderedPizzas: entity
        .getOrderedPizzas()
        .map((orderedPizza) =>
          this.orderedPizzaSchemaFactory.create(orderedPizza),
        ),
    } as OrderSchema;
  }

  createFromSchema(schema: OrderSchema): Order {
    return new Order(
      schema.id,
      this.userSchemaFactory.createFromSchema(schema.user),
      schema.orderedPizzas.map((orderedPizza) =>
        this.orderedPizzaSchemaFactory.createFromSchema(orderedPizza),
      ),
      schema.createdAt,
    );
  }
}
