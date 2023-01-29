import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  VersionColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export abstract class BaseSchema {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date = new Date();

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date = null;

  @VersionColumn({ default: 0 })
  version = 0;
}
