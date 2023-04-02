import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/user.model";
import { CreateProfileDto } from "../profile/dto/create.profile.dto";
import { ProfileService } from "../profile/profile.service";
import { FullUserDto } from "./dto/full.user.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService,
              private profileService: ProfileService) {
  }

  async login(userDto: CreateUserDto) {

    const user = await this.validateUser(userDto);
    return this.generateToken(user);

  }

  async registration(dto: FullUserDto) {

    const candidateMail = await this.userService.getUserByEmail(dto.email);

    if (candidateMail) {
      throw new HttpException("User with this email is already exists", HttpStatus.BAD_REQUEST);
    }

    const candidateNick = await this.profileService.getUserByNick(dto.nickName);

    if (candidateNick) {
      throw new HttpException("User with this nickname is already exists", HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 3);
    const user = await this.userService.createUser({ email: dto.email, password: hashPassword });

    await this.profileService.create({ ...dto, userId: user.id });

    return this.generateToken(user);

  }

  private async generateToken(user: User) {

    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload)
    };
  }

  private async validateUser(userDto: CreateUserDto) {

    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException({ message: "Wrong email" });
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (passwordEquals && user) {
      return user;
    }

    throw new UnauthorizedException({ message: "Wrong password" });

  }

}
