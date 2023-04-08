import { IsNotEmpty } from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  location: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  benefit: string;
  @IsNotEmpty()
  contact: string;
}
