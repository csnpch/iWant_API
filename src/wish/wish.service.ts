import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './wish.model';
import { Op } from 'sequelize';

@Injectable()
export class WishService {
  constructor(
    @InjectModel(Wish)
    private wishModel: typeof Wish,
  ) {}

  async create(id: string, createWishDto: CreateWishDto) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return await this.wishModel.create({
      member_id: id,
      expire: date,
      ...createWishDto,
    });
  }

  async findAll() {
    return await this.wishModel.findAll();
  }

  async findOne(id: number) {
    return await this.wishModel.findOne({
      where: {
        id,
      },
    });
  }

  async findByLocation(location: string) {
    return await this.wishModel.findAll({
      where: {
        location: {
          [Op.like]: `%${location}%`,
        },
      },
    });
  }

  async findNotMe(id: string) {
    return await this.wishModel.findAll({
      where: {
        member_id: {
          [Op.not]: id,
        },
      },
    });
  }

  async findByMe(id: string) {
    return await this.wishModel.findAll({
      where: {
        member_id: id,
      },
    });
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    return await this.wishModel.update(
      { ...updateWishDto },
      {
        where: {
          id,
        },
      },
    );
  }

  async updateExpire(id: number, idMember: string, date: Date) {
    return await this.wishModel.update(
      {
        expire: date,
      },
      {
        where: {
          id: id,
          member_id: idMember,
        },
      },
    );
  }

  async remove(id: number) {
    const wish = await this.wishModel.findOne({
      where: {
        id,
      },
    });
    return await wish.destroy();
  }

  async removeByOwner(id: number, idMember: string) {
    const wish = await this.wishModel.findOne({
      where: {
        id: id,
        member_id: idMember,
      },
    });
    return await wish.destroy();
  }
}
