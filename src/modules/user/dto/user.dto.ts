import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UserDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsUrl({}, { message: 'Homepage is invalid' })
  @IsOptional()
  homepage?: string;
}
