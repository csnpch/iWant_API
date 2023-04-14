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
  Put,
} from '@nestjs/common';
import { WishService } from './wish.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { JwtService } from '@nestjs/jwt';
import { DelivererService } from 'src/deliverer/deliverer.service';
import { Wish } from './wish.model';
import { WishEnt } from './entities/wish.entity';
import { Member } from 'src/member/member.model';

@Controller('wish')
export class WishController {
  constructor(
    private readonly wishService: WishService,
    private readonly delivererService: DelivererService,
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
    const wishs = await this.wishService.findNotMe(id);
    if (!wishs) {
      return res.status(500).json([]);
    }
    const result: Array<Wish> = [];
    const loc = location.split(',');
    for (const item of wishs) {
      const loc2 = item.location.split(',');
      const km = this.calcCrow(loc[0], loc[1], loc2[0], loc2[1]);
      if (km <= 10) {
        result.push(item);
      }
    }
    return res.status(200).json(result);
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
    const result: Array<WishEnt> = [];
    for (const item of wishs) {
      const deliverer = await this.delivererService.findAllByWishJoinMember(
        item.id,
      );
      const members: Array<Member> = [];
      for (const item2 of deliverer) {
        members.push(item2.member);
      }
      const newWish: WishEnt = {
        id: item.id,
        member_id: item.member_id,

        title: item.title,

        location: item.location,

        description: item.description,

        benefit: item.benefit,

        contact: item.contact,

        deliverers: members,

        expire: item.expire,
        createdAt: item.createdAt,
      };
      result.push(newWish);
    }
    return res.status(200).json(result);
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

  @Put('/expire/:id')
  @Version('1')
  @UseGuards(AuthenticationGuard)
  async updateExpire(
    @Param('id') id: string,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const token = headers.authorization.split(' ')[1];
    const idMember = (await this.jwtService.decode(token))['id'];
    const check = await this.wishService.findOne(+id);
    if (!check) {
      return res.status(204).json({
        status: false,
        message: 'not found wish in database',
      });
    }
    const newDate = new Date(check.expire);
    newDate.setDate(newDate.getDate() + 1);
    const update = await this.wishService.updateExpire(+id, idMember, newDate);
    if (!update) {
      return res.status(500).json(false);
    }
    return res.status(200).json(true);
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

  private calcCrow(lat1, long1, lat2, long2) {
    const _eQuatorialEarthRadius = 6378.137;
    const _d2r = Math.PI / 180.0;
    const dlong = (long2 - long1) * _d2r;
    const dlat = (lat2 - lat1) * _d2r;
    const a =
      Math.pow(Math.sin(dlat / 2.0), 2.0) +
      Math.cos(lat1 * _d2r) *
        Math.cos(lat2 * _d2r) *
        Math.pow(Math.sin(dlong / 2.0), 2.0);
    const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
    const d = _eQuatorialEarthRadius * c;

    return d;
  }

  // Converts numeric degrees to radians
  private toRad(Value) {
    return (Value * Math.PI) / 180;
  }
}
