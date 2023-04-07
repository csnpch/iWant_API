import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'tb_deliverers',
  timestamps: true,
  deletedAt: true,
})
export class Deliverer extends Model {
  @Column
  member_id: number;

  @Column
  wish_id: number;

  @Column({ defaultValue: true })
  isActive: boolean;
}
