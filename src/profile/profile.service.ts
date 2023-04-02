import { Injectable } from "@nestjs/common";
import { CreateProfileDto } from "./dto/create.profile.dto";
import { Profile } from "./profile.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile) private profileRepository: typeof Profile) {
  }

  async create(dto: CreateProfileDto) {
    const profile = await this.profileRepository.create(dto);
    return profile;
  }

  async getUserByNick(nickName: string) {
    const user = await this.profileRepository
      .findOne({ where: { nickName }, include: { all: true } });
    return user;
  }

  async update(profileDto: CreateProfileDto) {

    const profile = await this.getUserByNick(profileDto.nickName);
    return profile.update(profileDto);

  }

  async delete(userId: number) {

    const profile = await this.profileRepository.destroy({ where: { userId } });
    return profile;

  }

  async getAllProfiles() {

    const user = await this.profileRepository.findAll({ include: { all: true } });
    return user;

  }
}
