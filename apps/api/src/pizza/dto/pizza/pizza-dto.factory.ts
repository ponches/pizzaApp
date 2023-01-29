import { Injectable } from '@nestjs/common';
import { DtoFactory } from 'src/core/dto.factory';
import { Pizza } from 'src/pizza/entities/pizza.entity';
import { PizzaDto } from './pizza.dto';

@Injectable()
export class PizzaDtoFactory implements DtoFactory<Pizza, PizzaDto> {
  createFromEntity(entity: Pizza): PizzaDto {
    return {
      id: entity.getId(),
      name: entity.getName(),
      size: entity.getSize(),
      price: entity.getPrice(),
    };
  }
}
