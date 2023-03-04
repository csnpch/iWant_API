import { Test, TestingModule } from '@nestjs/testing';
import { DelivererController } from './deliverer.controller';
import { DelivererService } from './deliverer.service';

describe('DelivererController', () => {
  let controller: DelivererController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DelivererController],
      providers: [DelivererService],
    }).compile();

    controller = module.get<DelivererController>(DelivererController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
