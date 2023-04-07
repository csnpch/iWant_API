import { Column, Model, Table } from 'sequelize-typescript';

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
  deliverer: number;

  @Column
  accept: boolean;

  @Column({ defaultValue: true })
  isActive: boolean;
}
