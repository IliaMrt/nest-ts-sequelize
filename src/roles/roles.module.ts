import { forwardRef, Module } from "@nestjs/common";
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Role} from "./roles.model";
import {UserRoles} from "./user-role.model";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports:[SequelizeModule.forFeature([Role,User,UserRoles]),
    JwtModule,
    forwardRef(()=>AuthModule)],
  exports: [RolesService]

})
export class RolesModule {}
