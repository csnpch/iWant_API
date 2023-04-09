import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Deliverer } from 'src/deliverer/deliverer.model';

@Table({
  tableName: 'tb_wishs',
  timestamps: true,
  deletedAt: true,
})
export class Wish extends Model {
  @Column
  member_id: number;

  @Column
  title: string;

  @Column
  location: string;

  @Column
  description: string;

  @Column
  benefit: string;

  @Column
  contact: string;

  @Column
  expire: Date;

  @HasMany(() => Deliverer, 'wish_id')
  deliverers: Deliverer[];

  @Column({ defaultValue: true })
  isActive: boolean;
}
