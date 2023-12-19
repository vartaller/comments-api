import { IsOptional, IsInt } from 'class-validator';

export class ByQueryDto {
  @IsInt()
  @IsOptional()
  commentId: number;

  @IsOptional()
  userEmail: string;
}
