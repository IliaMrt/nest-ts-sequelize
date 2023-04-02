import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBlockDto } from "./dto/create.block.dto";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "../files/files.service";
import { Block } from "./blocks.model";
import { RolesService } from "../roles/roles.service";


@Injectable()
export class BlocksService {
  constructor(@InjectModel(Block) private blockRepositary: typeof Block,
              private fileService: FilesService) {
  }

  async createBlock(dto: CreateBlockDto, image: any) {
    const checkBlock = await this.getBlocksById(dto.blockId);
    if (checkBlock) {
      throw new HttpException("Block with this ID is already exists", HttpStatus.BAD_REQUEST);
    }
    const fileName = await this.fileService.createFile(
      image, undefined, null, "Blocks");

    const block = await this.blockRepositary.create({ ...dto, image: fileName });

    return block;
  }

  async getBlocksById(blockId: number) {
    const block = await this.blockRepositary.findOne({ where: { blockId }, include: { all: true } });
    return block;
  }

  async getBlocksByGroup(group: string) {
    const block = await this.blockRepositary.findAll({ where: { group: group } });
    return block;
  }

  async getAllBlocks() {
    const block = await this.blockRepositary.findAll({ include: { all: true } });
    return block;
  }

  async editBlock(dto: CreateBlockDto, image: any) {
    const checkBlock = await this.getBlocksById(dto.blockId);
    if (!checkBlock) {
      throw new HttpException("Block with this ID not found", HttpStatus.NOT_FOUND);
    }
    const fileName = checkBlock.image;
    if (dto.image) {
      await this.fileService.createFile(image, fileName, null, "Block");
    } else if (checkBlock.image) {
      await this.fileService.deleteFile(fileName);
    }
    const block = await checkBlock.update({ ...dto, image: fileName });
    return block;
  }

  async deleteBlocks(blockId: number) {

    const file = await this.blockRepositary.findOne({ where: { blockId: blockId } });

    if (file)
      await this.fileService.deleteFile(file.image);

    const block = await this.blockRepositary.destroy({ where: { blockId } });

    return block ?
      `Block with ID ${blockId} was deleted` :
      `Block with ID ${blockId} was NOT deleted`;

  }
}
