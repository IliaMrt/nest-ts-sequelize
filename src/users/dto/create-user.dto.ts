import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: "user@example.orf", description: 'Unique email'})
    @IsString({message: 'Must be String'})
    @IsEmail({}, {message: 'Email is incorrect'})
    readonly email: string;

    @ApiProperty({example: '123', description: 'Password'})
    @IsString({message: 'Must be String'})
    @Length(4, 16, {message: 'Min 4, max 16 symbols'})
    readonly password: string;

}