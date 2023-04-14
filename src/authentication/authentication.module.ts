import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { MemberModule } from 'src/member/member.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MemberModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
