import { forwardRef, Module } from "@nestjs/common";
import { BlocksService } from "./blocks.service";
import { BlocksController } from "./blocks.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Block } from "./blocks.model";
import { FilesModule } from "../files/files.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [BlocksService],
  controllers: [BlocksController],
  exports: [BlocksService],
  imports: [SequelizeModule.forFeature([Block]), FilesModule, JwtModule,
    forwardRef(() => AuthModule)]
})
export class BlocksModule {
}
