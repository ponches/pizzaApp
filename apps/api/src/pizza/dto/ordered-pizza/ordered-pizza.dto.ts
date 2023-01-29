import { PizzaDto } from '../pizza/pizza.dto';

export class OrderedPizzaDto {
  pizza: PizzaDto;
  quantity: number;
}
