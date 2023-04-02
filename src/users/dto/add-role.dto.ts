import {IsNumber, IsString} from "class-validator";

export class AddRoleDto{
    @IsString({message:'Must be String'})
    readonly value:string;

    @IsNumber({}, {message:'Must be Number'})
    readonly userId:number;
}