import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  userID: string;

  @IsNotEmpty()
  authType: string;

  @IsNotEmpty()
  fullname: string;

  tel: string;
  email: string;
}
