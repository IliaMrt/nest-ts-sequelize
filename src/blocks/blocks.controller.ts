import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { BlocksService } from "./blocks.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateBlockDto } from "./dto/create.block.dto";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles-guard";


@Controller("blocks")
export class BlocksController {
  constructor(private blockService: BlocksService) {
  }

  @Post("create")
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor("image"))
  createBlock(@Body() dto: CreateBlockDto,
              @UploadedFile() image) {
    return this.blockService.createBlock(dto, image);
  }

  @Post("edit")
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor("image"))
  editBlock(@Body() dto: CreateBlockDto,
            @UploadedFile() image) {
    return this.blockService.editBlock(dto, image);
  }

  @Get("search")
  getBlocks(@Query("id") id?: number, @Query("group") group?: string) {

    if (group) {
      return this.blockService.getBlocksByGroup(group);
    }

    if (id) {
      return this.blockService.getBlocksById(id);
    }

    return this.blockService.getAllBlocks();

  }

  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Get("delete")
  deleteBlocks(@Query("id") id: number) {
    return this.blockService.deleteBlocks(id);
  }

}
