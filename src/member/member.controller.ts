import {
  Controller,
  Headers,
  Body,
  Patch,
  Param,
  Version,
  Res,
  UseGuards,
  Put,
  Get,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { UpdateTelMemberDto } from './dto/update-tel-member.dto';
import { JwtService } from '@nestjs/jwt';
import { get } from 'http';

@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  // @Post()
  // @Version('1')
  // async register(
  //   @Body() createMemberDto: CreateMemberDto,
  //   @Res() res: Response,
  // ) {
  //   const member = await this.memberService.findByToken(createMemberDto.token);
  //   if (member) {
  //     return res.status(200).json({
  //       status: false,
  //       message: 'duplicate token in database',
  //       data: null,
  //     });
  //   }
  //   const create = await this.memberService.create(createMemberDto);
  //   if (!create) {
  //     return res.status(500).json({
  //       status: false,
  //       message: "can't member",
  //       data: null,
  //     });
  //   }
  //   return res.status(201).json({
  //     status: true,
  //     message: 'create member success',
  //     data: create,
  //   });
  // }

  @Get('/')
  @Version('1')
  @UseGuards(AuthenticationGuard)
  async profile(@Res() res: Response, @Headers() headers) {
    const token = headers.authorization.split(' ')[1];
    const id = (await this.jwtService.decode(token))['id'];
    const check = await this.memberService.findOne(+id);
    if (!check) {
      return res.status(400).json({
        status: false,
        message: 'not found member',
        data: null,
      });
    }
    return res.status(200).json(check);
  }

  @Patch('/')
  @Version('1')
  @UseGuards(AuthenticationGuard)
  async update(
    @Headers() headers,
    @Body() updateMemberDto: UpdateMemberDto,
    @Res() res: Response,
  ) {
    const token = headers.authorization.split(' ')[1];
    const id = (await this.jwtService.decode(token))['id'];
    const check = await this.memberService.findOne(+id);
    if (!check) {
      return res.status(400).json({
        status: false,
        message: 'not found member',
        data: null,
      });
    }
    const member = await this.memberService.update(+id, updateMemberDto);
    if (!member) {
      return res.status(500).json({
        status: false,
        message: "can't update information member",
      });
    }
    return res.status(200).json({
      status: true,
      message: 'update information member success',
    });
  }

  @Put('tel')
  @Version('1')
  @UseGuards(AuthenticationGuard)
  async updateTel(
    @Headers() headers,
    @Body() updateTelMemberDto: UpdateTelMemberDto,
    @Res() res: Response,
  ) {
    const token = headers.authorization.split(' ')[1];
    const id = (await this.jwtService.decode(token))['id'];
    const check = await this.memberService.findOne(+id);
    if (!check) {
      return res.status(400).json({
        status: false,
        message: 'not found member',
        data: null,
      });
    }
    const member = await this.memberService.updateTel(+id, updateTelMemberDto);
    if (!member) {
      return res.status(500).json({
        status: false,
        message: "can't update tel member",
        data: null,
      });
    }
    return res.status(200).json({
      status: true,
      message: 'update tel member success',
      data: member,
    });
  }
}
