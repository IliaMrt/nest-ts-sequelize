import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiOperation, ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {UserRoles} from "./user-role.model";

interface RoleCreationAttrs {
    value: string;
    description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    @ApiProperty({example: 1, description: 'Unique identify'})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    @ApiProperty({example: "Admin", description: 'Administrator'})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({example: "Administrator", description: 'Administrator!'})
    description: string;

    @BelongsToMany(()=>User,()=>UserRoles)
    users:User[];

}