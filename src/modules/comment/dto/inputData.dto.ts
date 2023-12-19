import { CommentDto } from './comment.dto';
import { UserDto } from '../../user/dto/user.dto';
import { IsOptional } from 'class-validator';

export class InputDataDto {
  @IsOptional()
  userData: UserDto;
  @IsOptional()
  commentData: CommentDto;
}

// export class InputDataDto {
//   @IsString({ message: 'Name must be a string' })
//   @IsNotEmpty({ message: 'Name should not be empty' })
//   name: string;

//   @IsString({ message: 'Email must be a string' })
//   @IsEmail({}, { message: 'Email is invalid' })
//   @IsNotEmpty({ message: 'Email should not be empty' })
//   email: string;

//   @IsUrl({}, { message: 'Homepage is invalid' })
//   @IsOptional()
//   homepage: string;

//   @IsNotEmpty({ message: 'Captcha should not be empty' })
//   captcha: string;

//   @IsNotEmpty({ message: 'Text should not be empty' })
//   text: string;

//   @IsInt()
//   @IsOptional()
//   parentId: string;
// }
