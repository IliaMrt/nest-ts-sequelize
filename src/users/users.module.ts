import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-role.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import { Profile } from "../profile/profile.model";
import { ProfileModule } from "../profile/profile.module";
import { FilesModule } from "../files/files.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[SequelizeModule.forFeature([User,Role,UserRoles,Profile]),
    RolesModule,
    ProfileModule,
    FilesModule,           
    forwardRef(()=>AuthModule)],
  exports:[UsersService]
})
export class UsersModule {}

