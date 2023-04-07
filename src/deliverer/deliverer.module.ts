import { Module } from '@nestjs/common';
import { DelivererService } from './deliverer.service';
import { DelivererController } from './deliverer.controller';
import { Deliverer } from './deliverer.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Deliverer])],
  controllers: [DelivererController],
  providers: [DelivererService],
})
export class DelivererModule {}
