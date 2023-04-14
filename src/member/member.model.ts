import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Deliverer } from 'src/deliverer/deliverer.model';

@Table({
  tableName: 'tb_members',
  timestamps: true,
  deletedAt: true,
})
export class Member extends Model {
  @Column
  authType: string;

  @Column
  token: string;

  @Column
  fullName: string;

  @Column({ allowNull: true })
  tel: string;

  @Column({ allowNull: true })
  email: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Deliverer, 'member_id')
  deliverers: Deliverer[];
}
