import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-role.model";
import { User } from "../users/user.model";

interface FileCreationAttrs {
  fileName: string;
  essenceTable: string;
  essenceId: number;
}

@Table({ tableName: "files" })
export class File extends Model<File, FileCreationAttrs> {

  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  fileName: string;

  @Column({ type: DataType.STRING })
  essenceTable: string;

  @Column({ type: DataType.INTEGER })
  essenceId: number;

}