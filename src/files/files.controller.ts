import { Controller, Get, UseGuards } from "@nestjs/common";
import { FilesService } from "./files.service";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles-guard";

@Controller("files")
export class FilesController {
  constructor(private fileService: FilesService) {
  }

  @Get()
  @Roles("Admin")
  @UseGuards(RolesGuard)
  clearOldUnusedFiles() {
    return this.fileService.clearOldUnusedFiles();
  }
}
