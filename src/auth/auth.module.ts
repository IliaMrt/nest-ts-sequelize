import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { ProfileModule } from "../profile/profile.module";
import { BlocksModule } from "../blocks/blocks.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UsersModule),
    forwardRef(() => ProfileModule),
    forwardRef(() => BlocksModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: { expiresIn: "24h" }
    })],
  exports: [AuthService, JwtModule]
})
export class AuthModule {
}
