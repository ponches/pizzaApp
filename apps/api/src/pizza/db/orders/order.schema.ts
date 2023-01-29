import { BaseSchema } from 'src/database/base.schema';
import { UserSchema } from 'src/users/db/user/user.schema';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderedPizzaSchema } from '../ordered-pizza/ordered-pizza.schema';

@Entity('orders')
export class OrderSchema extends BaseSchema {
  @ManyToOne(() => UserSchema, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserSchema;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany(() => OrderedPizzaSchema, (orderedPizza) => orderedPizza.order, {
    eager: true,
    cascade: true,
  })
  orderedPizzas: OrderedPizzaSchema[];
}
