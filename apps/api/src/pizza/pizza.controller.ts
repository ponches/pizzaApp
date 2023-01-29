import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUser } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/entities/user/user.entity';
import { OrderDtoFactory } from './dto/order/order-dto.factory';
import { OrderDto } from './dto/order/order.dto';
import { PendingPizzaDto } from './dto/pending-pizza.dto';
import { PendingPizzaFactory } from './entities/pending-pizza/pending-pizza.factory';
import { PizzaService } from './pizza.service';

@Controller('pizza')
export class PizzaController {
  constructor(
    private readonly pizzaService: PizzaService,
    private readonly pendingPizzaFactory: PendingPizzaFactory,
    private readonly orderDtoFactory: OrderDtoFactory,
  ) {}

  @Get()
  findAll() {
    return this.pizzaService.findAll();
  }

  @Post('order')
  async orderPizza(
    @GetUser() user: User,
    @Body() dto: PendingPizzaDto[],
  ): Promise<OrderDto> {
    const pendingOrderedPizzas = [];
    for (let pendingPizza of dto) {
      const pendingOrderedPizza = await this.pendingPizzaFactory.create(
        pendingPizza.quantity,
        pendingPizza.pizzaId,
      );
      pendingOrderedPizzas.push(pendingOrderedPizza);
    }

    const order = await this.pizzaService.createOrder(
      user,
      pendingOrderedPizzas,
    );
    return this.orderDtoFactory.createFromEntity(order);
  }

  @Get('order')
  async getOrders(@GetUser() user: User): Promise<OrderDto[]> {
    const orders = await this.pizzaService.findAllUserOrders(user);
    return orders.map((order) => this.orderDtoFactory.createFromEntity(order));
  }
}
