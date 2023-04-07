import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Version,
  Res,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Response } from 'express';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @Version('1')
  async register(
    @Body() createMemberDto: CreateMemberDto,
    @Res() res: Response,
  ) {
    const member = await this.memberService.findByToken(createMemberDto.token);
    if (member) {
      return res.status(200).json({
        status: false,
        message: 'duplicate token in database',
        data: null,
      });
    }
    const create = await this.memberService.create(createMemberDto);
    if (!create) {
      return res.status(500).json({
        status: false,
        message: "can't member",
        data: null,
      });
    }
    return res.status(201).json({
      status: true,
      message: 'create member success',
      data: create,
    });
  }

  @Patch(':id')
  @Version('1')
  async update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
    @Res() res: Response,
  ) {
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
        data: null,
      });
    }
    return res.status(200).json({
      status: true,
      message: 'update information member success',
      data: member,
    });
  }
}
