import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  contain: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  like: boolean;

  userId: string;
}
