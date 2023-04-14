import {
  Headers,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Response } from 'express';
import { DelivererService } from './deliverer.service';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('deliverer')
export class DelivererController {
  constructor(
    private readonly delivererService: DelivererService,
    private jwtService: JwtService,
  ) {}

  @Get(':id')
  @Version('1')
  @UseGuards(AuthenticationGuard)
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

  @Post(':id')
  @Version('1')
  @UseGuards(AuthenticationGuard)
  async createPost(
    @Res() res: Response,
    @Headers() headers,
    @Param('id') idWish: string,
  ) {
    const token = headers.authorization.split(' ')[1];
    const idMember = (await this.jwtService.decode(token))['id'];
    const deliverer = await this.delivererService.create(idMember, idWish);
    if (!deliverer) {
      return res.status(500).json({
        status: false,
        message: "can't create deliverer",
      });
    }
    return res.status(201).json({
      status: true,
      message: 'create deliverer success',
    });
  }

  @Delete(':id')
  @Version('1')
  @UseGuards(AuthenticationGuard)
  async remove(@Param('id') id: number, @Res() res: Response) {
    this.delivererService.remove(+id);
    return res.status(204).json({
      status: true,
      message: 'remove deliverer success',
      data: null,
    });
  }
}
