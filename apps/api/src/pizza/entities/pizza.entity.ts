import { IdentifiableEntity } from 'src/core/identifiable.entity';

export enum PizzaSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export class Pizza extends IdentifiableEntity {
  constructor(
    id: string,
    private name: string,
    private price: number,
    private size: PizzaSize,
    private imageUrl: string,
  ) {
    super(id);
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public getSize(): PizzaSize {
    return this.size;
  }

  public getImageUrl(): string {
    return this.imageUrl;
  }
}
