import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Member } from 'src/member/member.model';
import { Wish } from 'src/wish/wish.model';

@Table({
  tableName: 'tb_deliverers',
  timestamps: true,
  deletedAt: true,
})
export class Deliverer extends Model {
  @ForeignKey(() => Member)
  @Column
  member_id: number;

  @ForeignKey(() => Wish)
  @Column
  wish_id: number;

  @Column({ defaultValue: true })
  isActive: boolean;

  @BelongsTo(() => Member, 'id')
  member: Member;

  @BelongsTo(() => Wish, 'id')
  wish: Member;
}
