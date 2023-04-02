import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { User } from "../users/user.model";

interface ProfileCreationAttrs {
  userId: number;
  userName: string;
  userSurname: string;
  nickName: string;
}

@Table({ tableName: "profiles" })
export class Profile extends Model<Profile, ProfileCreationAttrs> {

  @ForeignKey(()=>User)
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  @ApiProperty({ example: 1, description: "Unique identify" })
  userId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: "Ilia", description: "User name" })
  userName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: "Ivanov", description: "Surname" })
  userSurname: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  @ApiProperty({ example: "My-nick", description: "Surname" })
  nickName: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  @ApiProperty({ example: "+1234567", description: "Phone number" })
  phoneNumber: string;


}