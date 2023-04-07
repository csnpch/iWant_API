import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { MemberModule } from 'src/member/member.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MemberModule,
    JwtService,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
