import { Module } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { Wish } from './wish.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Wish])],
  controllers: [WishController],
  providers: [WishService],
})
export class WishModule {}
