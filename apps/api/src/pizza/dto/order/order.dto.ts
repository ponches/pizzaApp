import { OrderedPizzaDto } from '../ordered-pizza/ordered-pizza.dto';

export class OrderDto {
  id: string;
  orderedPizzas: OrderedPizzaDto[];
  price: number;
  createdAt: Date;
}
