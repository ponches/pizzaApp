import { Injectable } from '@nestjs/common';
import { DtoFactory } from 'src/core/dto.factory';
import { Order } from 'src/pizza/entities/order/order';
import { OrderedPizzaDtoFactory } from '../ordered-pizza/ordered-pizza-dto.factory';
import { OrderDto } from './order.dto';

@Injectable()
export class OrderDtoFactory implements DtoFactory<Order, OrderDto> {
  constructor(
    private readonly orderedPizzaDtoFactory: OrderedPizzaDtoFactory,
  ) {}

  createFromEntity(entity: Order): OrderDto {
    return {
      id: entity.getId(),
      orderedPizzas: entity
        .getOrderedPizzas()
        .map((orderedPizza) =>
          this.orderedPizzaDtoFactory.createFromEntity(orderedPizza),
        ),
      price: entity.getPrice(),
      createdAt: entity.getCreatedAt(),
    };
  }
}
