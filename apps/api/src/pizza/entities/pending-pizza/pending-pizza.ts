import { Entity } from 'src/core/entity';
import { Pizza } from '../pizza.entity';

export class PendingPizza extends Entity {
  constructor(private quantity: number, private pizza: Pizza) {
    super();
  }

  getPizza(): Pizza {
    return this.pizza;
  }

  getQuantity(): number {
    return this.quantity;
  }
}
