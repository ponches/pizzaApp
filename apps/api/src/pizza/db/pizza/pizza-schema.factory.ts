import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { Pizza } from 'src/pizza/entities/pizza.entity';
import { PizzaSchema } from './pizza.schema';

@Injectable()
export class PizzaSchemaFactory
  implements EntitySchemaFactory<PizzaSchema, Pizza>
{
  create(entity: Pizza): PizzaSchema {
    return {
      id: entity.getId(),
      name: entity.getName(),
      size: entity.getSize(),
      price: entity.getPrice(),
      imageUrl: entity.getImageUrl(),
    } as PizzaSchema;
  }

  createFromSchema(schema: PizzaSchema): Pizza {
    return new Pizza(
      schema.id,
      schema.name,
      schema.price,
      schema.size,
      schema.imageUrl,
    );
  }
}
