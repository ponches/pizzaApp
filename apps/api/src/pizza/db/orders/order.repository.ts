import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { Order } from 'src/pizza/entities/order/order';
import { Repository } from 'typeorm';
import { OrderSchemaFactory } from './order-schema.factory';
import { OrderSchema } from './order.schema';

@Injectable()
export class OrderRepository extends BaseEntityRepository<OrderSchema, Order> {
  constructor(
    @InjectRepository(OrderSchema) ordersRepo: Repository<OrderSchema>,
    orderSchemaFactory: OrderSchemaFactory,
  ) {
    super(ordersRepo, orderSchemaFactory);
  }

  async findAllUserOrders(userId: string): Promise<Order[]> {
    const orderSchemas = await this.entityRepo.find({
      where: {
        userId,
      },
    });

    return orderSchemas.map((schema) =>
      this.entitySchemaFactory.createFromSchema(schema),
    );
  }
}
