import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  userID: string;
}
