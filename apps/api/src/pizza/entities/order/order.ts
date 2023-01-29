import { IdentifiableEntity } from 'src/core/identifiable.entity';
import { User } from 'src/users/entities/user/user.entity';
import { OrderedPizza } from '../ordered-pizza';

export class Order extends IdentifiableEntity {
  constructor(
    id: string,
    private user: User,
    private orderedPizzas: OrderedPizza[],
    private createdAt: Date,
  ) {
    super(id);
  }

  getUser(): User {
    return this.user;
  }

  getOrderedPizzas(): OrderedPizza[] {
    return this.orderedPizzas;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getPrice(): number {
    let price = 0;
    this.orderedPizzas.forEach((orderedPizza) => {
      price += orderedPizza.getQuantity() * orderedPizza.getPizza().getPrice();
    });
    return price;
  }
}
