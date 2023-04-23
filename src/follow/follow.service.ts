import { Injectable } from '@nestjs/common';
import { FollowDto } from './dto/follow.dto';
import { PrismaService } from "../prisma/prisma.service";
import { FollowEntity } from "./entities/follow.entity";

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAll(): Promise<Array<FollowEntity>> {
    return await this.prisma.follow.findMany({
      include: {
        followers: true,
        following: true
      },
    });
  }

  public async getOne(id: string): Promise<FollowEntity> {
    return await this.prisma.follow.findFirst({
      where: {
        flw_id: id,
      },
      include: {
        followers: true,
        following: true
      },
    });
  }

  public async create(followDto: FollowDto): Promise<FollowEntity> {
    return await this.prisma.follow.create({
      data: {
        flw_followers: followDto.followers.id,
        flw_following: followDto.following.id,
      },
      include: {
        followers: true,
        following: true
      },
    });
  }

  public async delete(id: string): Promise<FollowEntity> {
    return await this.prisma.follow.delete({
      where: {
        flw_id: id,
      },
      include: {
        following: true,
        followers: true,
      },
    });
  }
}
