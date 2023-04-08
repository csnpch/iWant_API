import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Headers,
  Res,
  UseGuards,
} from '@nestjs/common';
import { WishService } from './wish.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('wish')
export class WishController {
  constructor(
    private readonly wishService: WishService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @Version('1')
  @UseGuards(AuthenticationGuard)
  async create(
    @Body() createWishDto: CreateWishDto,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const token = headers.authorization.split(' ')[1];
    const id = (await this.jwtService.decode(token))['id'];
    const wish = await this.wishService.create(id, createWishDto);
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

  @Get('/location/:location')
  @Version('1')
  @UseGuards(AuthenticationGuard)
  async findByLocation(
    @Param('location') location: string,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const token = headers.authorization.split(' ')[1];
    const id = (await this.jwtService.decode(token))['id'];
    const wishs = await this.wishService.findByLocationAndNotMe(location, id);
    if (!wishs) {
      return res.status(500).json([]);
    }
    return res.status(200).json(wishs);
  }

  @Get('me')
  @Version('1')
  @UseGuards(AuthenticationGuard)
  async findByMe(@Res() res: Response, @Headers() headers) {
    const token = headers.authorization.split(' ')[1];
    const id = (await this.jwtService.decode(token))['id'];
    const wishs = await this.wishService.findByMe(id);
    if (!wishs) {
      return res.status(500).json([]);
    }
    return res.status(200).send(wishs);
  }

  @Get(':id')
  @Version('1')
  @UseGuards(AuthenticationGuard)
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
  @UseGuards(AuthenticationGuard)
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
  @UseGuards(AuthenticationGuard)
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const token = headers.authorization.split(' ')[1];
    const idMember = (await this.jwtService.decode(token))['id'];
    this.wishService.removeByOwner(+id, idMember);
    return res.status(204).json({
      status: true,
      message: 'remove wish success',
      data: null,
    });
  }
}
