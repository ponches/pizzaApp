import { IsNumber, IsUUID, Max, Min } from 'class-validator';

export class PendingPizzaDto {
  @IsUUID()
  pizzaId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  quantity: number;
}
