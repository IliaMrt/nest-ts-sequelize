import { forwardRef, Module } from "@nestjs/common";
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { File } from "./file.model";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [FilesService],
  exports:[FilesService],
  imports:[SequelizeModule.forFeature([File]),
    JwtModule,
    forwardRef(()=>AuthModule)],

  controllers: [FilesController]
})
export class FilesModule {}
