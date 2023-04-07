import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Res,
} from '@nestjs/common';
import { WishService } from './wish.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Response } from 'express';

@Controller('wish')
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @Post()
  @Version('1')
  async create(@Body() createWishDto: CreateWishDto, @Res() res: Response) {
    const wish = await this.wishService.create(createWishDto);
    if (!wish) {
      return res.status(500).json({
        status: false,
        message: "can't create wish",
        data: null,
      });
    }
    return res.status(201).json({
      status: true,
      message: 'create wish success',
      data: wish,
    });
  }

  @Get()
  @Version('1')
  async findByLocation(
    @Param('location') location: string,
    @Res() res: Response,
  ) {
    const wishs = await this.wishService.findByLocation(location);
    if (!wishs) {
      return res.status(500).json({
        status: false,
        message: "can't find wish",
        data: null,
      });
    }
    return res.status(200).json({
      status: true,
      message: 'find wish success',
      data: wishs,
    });
  }

  @Get(':id')
  @Version('1')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const wishs = await this.wishService.findOne(+id);
    if (!wishs) {
      return res.status(500).json({
        status: false,
        message: "can't find wish",
        data: null,
      });
    }
    return res.status(200).json({
      status: true,
      message: 'find wish success',
      data: wishs,
    });
  }

  @Patch(':id')
  @Version('1')
  async update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Res() res: Response,
  ) {
    const check = await this.wishService.findOne(+id);
    if (!check) {
      return res.status(204).json({
        status: false,
        message: 'not found wish in database',
        data: null,
      });
    }
    const update = await this.wishService.update(+id, updateWishDto);
    if (!update) {
      return res.status(200).json({
        status: false,
        message: "can't update wish success",
        data: null,
      });
    }
    return res.status(200).json({
      status: true,
      message: 'update wish success',
      data: update,
    });
  }

  @Delete(':id')
  @Version('1')
  async remove(@Param('id') id: string, @Res() res: Response) {
    this.wishService.remove(+id);
    return res.status(204).json({
      status: true,
      message: 'remove wish success',
      data: null,
    });
  }
}
