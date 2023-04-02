import { ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { CreateProfileDto } from "../profile/dto/create.profile.dto";
//import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";
import { ProfileService } from "../profile/profile.service";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private profileService: ProfileService,
              private roleService: RolesService,
              private jwtService: JwtService) {
  }


  async createUser(dto: CreateUserDto) {

    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRolebyValue("USER");

    await user.$set("roles", [role.id]);

    user.roles = [role];

    return user;

  }

  async getAllUsers() {

    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;

  }

  async getUserByEmail(email: string) {

    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;

  }

  async addRole(dto: AddRoleDto) {

    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRolebyValue(dto.value);

    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }

    throw new HttpException("User or role not found", HttpStatus.NOT_FOUND);

  }

  async edit(userDto: CreateUserDto, profileDto: CreateProfileDto, req) {

    if (req.authorization==undefined){
      throw new HttpException("You is not authorised", HttpStatus.FORBIDDEN);
    }

    const checkUser = await this.getUserByEmail(userDto.email);
    const firstUserId = this.jwtService.verify(req.authorization.split(" ")[1]);

    const isReqUserAdmin = firstUserId.roles.reduce((res, obj) => {
      return res || obj.value == "Admin";
    }, false);

    if (!(firstUserId.email == userDto.email || isReqUserAdmin)) {
      throw new HttpException("You have no permission", HttpStatus.FORBIDDEN);
    }

    if (!checkUser) {
      throw new HttpException("User with this email not found", HttpStatus.NOT_FOUND);
    }

    const user = await checkUser.update({ ...userDto });
    const profile = await this.profileService.update(profileDto);

    return { user, profile };
  }


  async delete(id: number, req) {

    if (req.authorization==undefined){
      throw new HttpException("You is not authorised", HttpStatus.FORBIDDEN);
    }

    const firstUserId = this.jwtService.verify(req.authorization.split(" ")[1]);

    const isReqUserAdmin = firstUserId.roles.reduce((res, obj) => {
      return res || obj.value == "Admin";
    }, false);

    if (!(firstUserId.id == id || isReqUserAdmin)) {
      throw new HttpException("You have no permission", HttpStatus.FORBIDDEN);
    }

    const user = await this.userRepository.destroy({ where: { id } });
    const profile = await this.profileService.delete(id);

    return { user, profile };

  }
}
