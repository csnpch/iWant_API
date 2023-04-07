import { IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  authType: string;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  fullName: string;

  tel: string;
  email: string;
}
