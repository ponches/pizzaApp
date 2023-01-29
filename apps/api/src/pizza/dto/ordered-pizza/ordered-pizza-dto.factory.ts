import { Injectable } from '@nestjs/common';
import { DtoFactory } from 'src/core/dto.factory';
import { OrderedPizza } from 'src/pizza/entities/ordered-pizza';
import { Pizza } from 'src/pizza/entities/pizza.entity';
import { PizzaDtoFactory } from '../pizza/pizza-dto.factory';
import { OrderedPizzaDto } from './ordered-pizza.dto';

@Injectable()
export class OrderedPizzaDtoFactory
  implements DtoFactory<OrderedPizza, OrderedPizzaDto>
{
  constructor(private readonly pizzaDtoFactory: PizzaDtoFactory) {}

  createFromEntity(entity: OrderedPizza): OrderedPizzaDto {
    return {
      quantity: entity.getQuantity(),
      pizza: this.pizzaDtoFactory.createFromEntity(entity.getPizza()),
    };
  }
}
