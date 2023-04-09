import { Module } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { Wish } from './wish.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { DelivererModule } from 'src/deliverer/deliverer.module';

@Module({
  imports: [SequelizeModule.forFeature([Wish]), DelivererModule],
  controllers: [WishController],
  providers: [WishService],
})
export class WishModule {}
