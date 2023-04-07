import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  Version,
} from '@nestjs/common';
import { Response } from 'express';
import { DelivererService } from './deliverer.service';
import { CreateDelivererDto } from './dto/create-deliverer.dto';

@Controller('deliverer')
export class DelivererController {
  constructor(private readonly delivererService: DelivererService) {}

  @Get(':id')
  @Version('1')
  async getByWishID(@Param('id') id: number, @Res() res: Response) {
    const deliverer = await this.delivererService.findOne(+id);
    if (!deliverer) {
      return res.status(500).json({
        status: false,
        message: "can't find deliverer",
        data: null,
      });
    }
    return res.status(200).json({
      status: true,
      message: 'find deliverer success',
      data: deliverer,
    });
  }

  @Post()
  @Version('1')
  async createPost(
    @Body() createDelivererDto: CreateDelivererDto,
    @Res() res: Response,
  ) {
    const deliverer = await this.delivererService.create(createDelivererDto);
    if (!deliverer) {
      return res.status(500).json({
        status: false,
        message: "can't create deliverer",
        data: null,
      });
    }
    return res.status(201).json({
      status: true,
      message: 'create deliverer success',
      data: deliverer,
    });
  }

  @Delete(':id')
  @Version('1')
  async remove(@Param('id') id: number, @Res() res: Response) {
    this.delivererService.remove(+id);
    return res.status(204).json({
      status: true,
      message: 'remove deliverer success',
      data: null,
    });
  }
}
