import { Body, Controller, ExecutionContext, Get, Post, UseGuards, Headers, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.model";
import { RolesGuard } from "../auth/roles-guard";
import { Roles } from "../auth/roles-auth.decorator";
import { AddRoleDto } from "./dto/add-role.dto";
import { CreateProfileDto } from "../profile/dto/create.profile.dto";


@ApiTags("Users!")

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({ summary: "Creating new user" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  };

  @ApiOperation({ summary: "Returning all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Provide role" })
  @ApiResponse({ status: 200 })
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: "Edit user information" })
  @ApiResponse({ status: 200 })
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post("/edit")
  edit(@Body("user") userDto: CreateUserDto,
       @Body("profile") profileDto: CreateProfileDto,
       @Headers() headers) {
    return this.usersService.edit(userDto, profileDto, headers);
  }

  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Get("/delete")
  delete(@Query("id") id: number, @Headers() req) {
    return this.usersService.delete(id, req);
  }
}

