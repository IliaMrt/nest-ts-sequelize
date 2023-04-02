import { Column, DataType, Model, Table } from "sequelize-typescript";

interface BlockCreationAttrs {
  title: string;
  content: string;
  image: string;
}

@Table({ tableName: "blocks" })
export class Block extends Model<Block, BlockCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  blockId: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  content: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.STRING })
  group: string;
}