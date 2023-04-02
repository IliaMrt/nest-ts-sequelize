import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString, Length } from "class-validator";

export class FullUserDto {
  @ApiProperty({ example: "user@example.orf", description: "Unique email" })
  @IsString({ message: "Must be String" })
  @IsEmail({}, { message: "Email is incorrect" })
  readonly email: string;

  @ApiProperty({ example: "1234", description: "Password" })
  @IsString({ message: "Must be String" })
  @Length(4, 16, { message: "Min 4, max 16 symbols" })
  readonly password: string;

  @ApiProperty({ example: "Iliya", description: "Name" })
  @IsString({ message: "Must be String" })
  @Length(1, 30, { message: "Min 1, max 30 symbols" })
  readonly userName: string;

  @ApiProperty({ example: "Ivanov", description: "Surname" })
  @IsString({ message: "Must be String" })
  @Length(1, 30, { message: "Min 1, max 30 symbols" })
  readonly userSurname: string;

  @ApiProperty({ example: "My-nick", description: "Nickname" })
  @IsString({ message: "Must be String" })
  @Length(1, 30, { message: "Min 1, max 30 symbols" })
  readonly nickName: string;

  @ApiProperty({example: '+1234567', description: 'Phone number'})
  @IsPhoneNumber( "RU",{message: 'Must be phone number'})
  readonly phoneNumber: string;
}