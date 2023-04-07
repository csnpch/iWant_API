import { Body, Controller, Post, Res, Version } from '@nestjs/common';
import { Response } from 'express';
import { MemberService } from 'src/member/member.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @Version('1')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const payload = { id: 1 };
    const result = { access_token: await this.jwtService.signAsync(payload) };
    return res.status(200).json({
      status: true,
      message: 'login success',
      data: result,
    });
  }
}
