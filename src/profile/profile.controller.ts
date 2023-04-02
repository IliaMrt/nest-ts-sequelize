import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateProfileDto } from "./dto/create.profile.dto";
import { ProfileService } from "./profile.service";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles-guard";

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {
  }

  @Get()
  @Roles("Admin")
  @UseGuards(RolesGuard)
  getAllProfiles() {
    const profiles = this.profileService.getAllProfiles();
    return profiles;
  }

  @Post("create")
  create(@Body() profileDto: CreateProfileDto) {
    const profile = this.profileService.create(profileDto);
    return profile;
  }

}
