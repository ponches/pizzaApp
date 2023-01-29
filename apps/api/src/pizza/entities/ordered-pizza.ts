import { IdentifiableEntity } from 'src/core/identifiable.entity';
import { Pizza } from './pizza.entity';

export class OrderedPizza extends IdentifiableEntity {
  constructor(
    id: string,
    private quantity: number,
    private pizza: Pizza,
    private orderId: string,
  ) {
    super(id);
  }

  getQuantity(): number {
    return this.quantity;
  }

  getPizza(): Pizza {
    return this.pizza;
  }

  getOrderId(): string {
    return this.orderId;
  }
}
