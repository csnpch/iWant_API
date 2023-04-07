import { Column, Model, Table } from 'sequelize-typescript';

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
}
