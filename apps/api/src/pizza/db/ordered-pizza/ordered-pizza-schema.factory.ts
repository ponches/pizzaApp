import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { OrderedPizza } from 'src/pizza/entities/ordered-pizza';
import { PizzaSchemaFactory } from '../pizza/pizza-schema.factory';
import { OrderedPizzaSchema } from './ordered-pizza.schema';

@Injectable()
export class OrderedPizzaSchemaFactory
  implements EntitySchemaFactory<OrderedPizzaSchema, OrderedPizza>
{
  constructor(private pizzaSchemaFactory: PizzaSchemaFactory) {}

  create(entity: OrderedPizza): OrderedPizzaSchema {
    return {
      quantity: entity.getQuantity(),
      pizza: this.pizzaSchemaFactory.create(entity.getPizza()),
      pizzaId: entity.getPizza().getId(),
      orderId: entity.getOrderId(),
    } as OrderedPizzaSchema;
  }

  createFromSchema(schema: OrderedPizzaSchema): OrderedPizza {
    return new OrderedPizza(
      schema.id,
      schema.quantity,
      this.pizzaSchemaFactory.createFromSchema(schema.pizza),
      schema.orderId,
    );
  }
}
