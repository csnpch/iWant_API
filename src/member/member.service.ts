import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './member.model';
import { UpdateTelMemberDto } from './dto/update-tel-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member)
    private memberModel: typeof Member,
  ) {}

  async findByToken(token: string) {
    return await this.memberModel.findOne({
      where: {
        token: token,
      },
    });
  }

  async create(createMemberDto: CreateMemberDto) {
    return await this.memberModel.create({ ...createMemberDto });
  }

  async findAll() {
    return await this.memberModel.findAll();
  }

  async findOne(id: number) {
    return await this.memberModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    return await this.memberModel.update(updateMemberDto, {
      where: { id },
    });
  }

  async updateTel(id: number, updateTelMemberDto: UpdateTelMemberDto) {
    return await this.memberModel.update(updateTelMemberDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const member = await this.memberModel.findOne({
      where: {
        id,
      },
    });
    return await member.destroy();
  }
}
