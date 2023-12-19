import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CommentDto {
  @IsNotEmpty({ message: 'Captcha should not be empty' })
  captcha: string;

  @IsNotEmpty({ message: 'Text should not be empty' })
  text: string;

  @IsInt()
  @IsOptional()
  parentId?: number;
}
