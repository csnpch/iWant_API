import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deliverer } from './deliverer.model';
import { CreateDelivererDto } from './dto/create-deliverer.dto';
import { UpdateDelivererDto } from './dto/update-deliverer.dto';

@Injectable()
export class DelivererService {
  constructor(
    @InjectModel(Deliverer)
    private delivererModel: typeof Deliverer,
  ) {}

  async create(createDelivererDto: CreateDelivererDto) {
    return await this.delivererModel.create({ ...createDelivererDto });
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
