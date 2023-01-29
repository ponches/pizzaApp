import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user/user.entity';
import { OrderRepository } from './db/orders/order.repository';
import { PizzaRepository } from './db/pizza/pizza.repository';
import { Order } from './entities/order/order';
import { OrderFactory } from './entities/order/order.factory';
import { OrderedPizza } from './entities/ordered-pizza';
import { PendingPizza } from './entities/pending-pizza/pending-pizza';
import { Pizza } from './entities/pizza.entity';

@Injectable()
export class PizzaService {
  constructor(
    private readonly pizzaRepo: PizzaRepository,
    private readonly orderFactory: OrderFactory,
    private readonly ordersRepo: OrderRepository,
  ) {}

  findAll(): Promise<Pizza[]> {
    return this.pizzaRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} pizza`;
  }

  async createOrder(user: User, pendingPizzas: PendingPizza[]): Promise<Order> {
    const orderedPizzas = pendingPizzas.map(
      (pizza) =>
        new OrderedPizza(null, pizza.getQuantity(), pizza.getPizza(), null),
    );

    return this.orderFactory.create(user, orderedPizzas);
  }

  findAllUserOrders(user: User): Promise<Order[]> {
    return this.ordersRepo.findAllUserOrders(user.getId());
  }
}
