import { IsNotEmpty } from 'class-validator';

export class UpdateTelMemberDto {
  @IsNotEmpty()
  tel: string;
}
