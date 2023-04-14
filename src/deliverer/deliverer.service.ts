import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deliverer } from './deliverer.model';
import { UpdateDelivererDto } from './dto/update-deliverer.dto';
import { Member } from 'src/member/member.model';
import { Op } from 'sequelize';

@Injectable()
export class DelivererService {
  constructor(
    @InjectModel(Deliverer)
    private delivererModel: typeof Deliverer,
  ) {}

  async create(idmember: string, idwish: string) {
    return await this.delivererModel.create({
      member_id: idmember,
      wish_id: idwish,
    });
  }

  async findAll() {
    return await this.delivererModel.findAll();
  }

  async findOne(id: number) {
    return await this.delivererModel.findOne({
      where: {
        id,
      },
    });
  }

  async findAllByWishJoinMember(id: number) {
    return await this.delivererModel.findAll({
      include: [
        {
          model: Member,
        },
      ],
      where: {
        wish_id: id,
      },
    });
  }

  async update(id: number, updateDelivererDto: UpdateDelivererDto) {
    return await this.delivererModel.update(
      { ...updateDelivererDto },
      {
        where: {
          id,
        },
      },
    );
  }

  async remove(id: number) {
    const wish = await this.delivererModel.findOne({
      where: {
        id,
      },
    });
    return await wish.destroy();
  }
}
