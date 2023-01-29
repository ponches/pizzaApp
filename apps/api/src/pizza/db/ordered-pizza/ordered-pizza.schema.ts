import { BaseSchema } from 'src/database/base.schema';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrderSchema } from '../orders/order.schema';
import { PizzaSchema } from '../pizza/pizza.schema';

@Entity('ordered_pizzas')
export class OrderedPizzaSchema extends BaseSchema {
  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => PizzaSchema, { eager: true })
  @JoinColumn({ name: 'pizza_id' })
  pizza: PizzaSchema;

  @Column({ name: 'pizza_id' })
  pizzaId: string;

  @ManyToOne(() => OrderSchema, (order) => order.orderedPizzas)
  @JoinColumn({ name: 'order_id' })
  order: OrderSchema;

  @Column({ name: 'order_id' })
  orderId: string;
}
