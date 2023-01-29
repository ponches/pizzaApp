import { BaseSchema } from 'src/database/base.schema';
import { Column, Entity } from 'typeorm';
import { PizzaSize } from '../../entities/pizza.entity';

@Entity('pizzas')
export class PizzaSchema extends BaseSchema {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: PizzaSize })
  size: PizzaSize;

  @Column({type: 'float'})
  price: number;

  @Column({name: 'image_url'})
  imageUrl: string;
}
