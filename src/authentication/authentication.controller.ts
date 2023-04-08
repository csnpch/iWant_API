import { Body, Controller, Post, Res, Version } from '@nestjs/common';
import { Response } from 'express';
import { MemberService } from 'src/member/member.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateMemberDto } from 'src/member/dto/create-member.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @Version('1')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    let user = await this.memberService.findByToken(loginDto.userID);
    if (!user) {
      const createMemberDto: CreateMemberDto = {
        authType: loginDto.authType,
        token: loginDto.userID,
        fullName: loginDto.fullname,
        tel: loginDto.tel,
        email: loginDto.email,
      };
      const status = this.memberService.create(createMemberDto);
      if (!status) {
        return res.status(500).json({
          status: false,
          message: "can't create user",
          data: null,
        });
      }
      user = await this.memberService.findByToken(loginDto.userID);
    }
    const payload = { id: user.id };
    const result = {
      access_token: await this.jwtService.signAsync(payload),
      tel: user.tel,
      fullname: user.fullName,
    };
    return res.status(200).json({
      status: true,
      message: 'login success',
      data: result,
    });
  }
}
