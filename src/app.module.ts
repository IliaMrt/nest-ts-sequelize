import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { User } from "./users/user.model";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-role.model";
import { AuthModule } from "./auth/auth.module";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ProfileModule } from "./profile/profile.module";
import * as path from "path";
import { Profile } from "./profile/profile.model";
import { BlocksModule } from "./blocks/blocks.module";
import { Block } from "./blocks/blocks.model";
import { JwtModule } from "@nestjs/jwt";
import { File } from "./files/file.model";

@Module({


  imports: [
    // получаем конфигурацию.
    // имя файла с конфигурацией берём из переменной окружения NODE_ENV.
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),

    // устанавливаем папку для get запросов статики
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static")
    }),

    // инициализируем базу данных
    // используем переменные окружения из предыдущего пункта
    // в models явно указываем все таблицы, с которыми собираемя работать
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Profile, Block, File],
      autoLoadModels: true

    }),

    // регистрируем модули, котрые используются в приложении
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    ProfileModule,
    BlocksModule,
    JwtModule
  ]

})
export class AppModule {
}