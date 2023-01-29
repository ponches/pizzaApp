import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/core/entity.factory';
import { OrderRepository } from 'src/pizza/db/orders/order.repository';
import { User } from 'src/users/entities/user/user.entity';
import { OrderedPizza } from '../ordered-pizza';
import { Order } from './order';

@Injectable()
export class OrderFactory implements EntityFactory<Order> {
  constructor(private readonly orderesRepo: OrderRepository) {}

  create(user: User, orderedPizzas: OrderedPizza[]): Promise<Order> {
    return this.orderesRepo.create(new Order(null, user, orderedPizzas, null));
  }
}
