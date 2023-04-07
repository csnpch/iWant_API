import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [MemberModule],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
