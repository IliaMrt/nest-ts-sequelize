import {ApiProperty} from "@nestjs/swagger";
import { IsEmail, IsNumber, IsPhoneNumber, IsString, Length } from "class-validator";

export class CreateProfileDto {
  @ApiProperty({example: "1", description: 'User ID'})
  @IsNumber({},{message: 'Must be Number'})
  readonly userId: number;

  @ApiProperty({example: 'Iliya', description: 'Name'})
  @IsString({message: 'Must be String'})
  @Length(1, 30, {message: 'Min 1, max 30 symbols'})
  readonly userName: string;

  @ApiProperty({example: 'Ivanov', description: 'Surname'})
  @IsString({message: 'Must be String'})
  @Length(1, 30, {message: 'Min 1, max 30 symbols'})
  readonly userSurname: string;

  @ApiProperty({example: 'My-nick', description: 'Nickname'})
  @IsString({message: 'Must be String'})
  @Length(1, 30, {message: 'Min 1, max 30 symbols'})
  readonly nickName: string;

  @ApiProperty({example: '+1234567', description: 'Phone number'})
  @IsPhoneNumber( "RU",{message: 'Must be phone number'})
  readonly phoneNumber: string;

}