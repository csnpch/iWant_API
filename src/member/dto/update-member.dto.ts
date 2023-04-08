import { IsNotEmpty } from 'class-validator';

export class UpdateMemberDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  tel: string;
  @IsNotEmpty()
  email: string;
}
