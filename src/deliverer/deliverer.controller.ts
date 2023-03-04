import { Controller } from '@nestjs/common';
import { DelivererService } from './deliverer.service';

@Controller('deliverer')
export class DelivererController {
  constructor(private readonly delivererService: DelivererService) {}
}
