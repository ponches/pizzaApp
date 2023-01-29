import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { Pizza } from 'src/pizza/entities/pizza.entity';
import { Repository } from 'typeorm';
import { PizzaSchemaFactory } from './pizza-schema.factory';
import { PizzaSchema } from './pizza.schema';

@Injectable()
export class PizzaRepository extends BaseEntityRepository<PizzaSchema, Pizza> {
  constructor(
    @InjectRepository(PizzaSchema) pizzasRepo: Repository<PizzaSchema>,
    pizzaSchemaFactory: PizzaSchemaFactory,
  ) {
    super(pizzasRepo, pizzaSchemaFactory);
  }
}
