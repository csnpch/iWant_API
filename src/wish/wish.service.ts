import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './wish.model';

@Injectable()
export class WishService {
  constructor(
    @InjectModel(Wish)
    private wishModel: typeof Wish,
  ) {}

  async create(createWishDto: CreateWishDto) {
    return await this.wishModel.create({ ...createWishDto });
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
        location: location,
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

  async remove(id: number) {
    const wish = await this.wishModel.findOne({
      where: {
        id,
      },
    });
    return await wish.destroy();
  }
}
