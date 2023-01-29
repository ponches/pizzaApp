import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityFactory } from 'src/core/entity.factory';
import { PizzaRepository } from 'src/pizza/db/pizza/pizza.repository';
import { PendingPizza } from './pending-pizza';

@Injectable()
export class PendingPizzaFactory implements EntityFactory<PendingPizza> {
  constructor(private readonly pizzasRepo: PizzaRepository) {}

  async create(quantity: number, pizzaId: string): Promise<PendingPizza> {
    const pizza = await this.pizzasRepo.findOneById(pizzaId);
    if (!pizza) throw new NotFoundException('Pizza not found');

    return new PendingPizza(quantity, pizza);
  }
}
