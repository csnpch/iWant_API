import { Module } from '@nestjs/common';
import { DelivererService } from './deliverer.service';
import { DelivererController } from './deliverer.controller';

@Module({
  controllers: [DelivererController],
  providers: [DelivererService]
})
export class DelivererModule {}
