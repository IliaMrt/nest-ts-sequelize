import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles-guard";

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {
    }

    @Post()
    @Roles("Admin")
    @UseGuards(RolesGuard)
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @Get('/:value')
    @Roles("Admin")
    @UseGuards(RolesGuard)
    getByValue(@Param('value') value: string) {
        return this.roleService.getRolebyValue(value)
    }
}
