import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Follow } from './entity/follow.entity';
import { FollowDto } from './dto/follow.dto';
import { follow } from '@prisma/client';
import { every } from 'rxjs';
import { NewFollowDto } from './dto/new-follow.dto';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAll(): Promise<Array<Follow>> {
    return await this.prisma.follow.findMany({
      include: {
        follower: true,
        following: true,
      },
    });
  }

  public async countMyFollowers(id: string): Promise<number> {
    return this.prisma.follow.count({
      where: {
        flw_following: id,
      },
    });
  }

  public async getAllFollowers(id: string): Promise<Array<Follow>> {
    return this.prisma.follow.findMany({
      where: {
        flw_following: id,
      },
      include: {
        follower: true,
      },
    });
  }
  public async getAllFollowings(id: string): Promise<Array<Follow>> {
    return this.prisma.follow.findMany({
      where: {
        flw_follower: id,
      },
      include: {
        following: true,
      },
    });
  }

  public async countMyFollowing(id: string): Promise<number> {
    return this.prisma.follow.count({
      where: {
        flw_follower: id,
      },
    });
  }
  public async getOne(id: string): Promise<Follow> {
    return await this.prisma.follow.findFirst({
      where: {
        flw_id: id,
      },
    });
  }

  public async create(follow: FollowDto): Promise<follow> {
    return await this.prisma.follow.create({
      data: {
        follower: {
          connect: {
            per_id: follow.follower.id,
          },
        },
        following: {
          connect: {
            per_id: follow.following.id,
          },
        },
      },
      include: {
        follower: true,
        following: true,
      },
    });
  }

  public async createFromPerson(
    id: string,
    followDto: NewFollowDto,
  ): Promise<Follow> {
    console.log(followDto);
    return await this.prisma.follow.create({
      data: {
        flw_follower: id,
        flw_following: followDto.following,
      },
      include: {
        follower: true,
        following: true,
      },
    });
  }

  public async isFollowing(
    followerId: string,
    followingId: string,
  ): Promise<Follow> {
    return await this.prisma.follow.findFirst({
      where: {
        AND: [
          {
            flw_follower: followerId,
          },
          {
            flw_following: followingId,
          },
        ],
      },
    });
  }

  public async delete(id: string): Promise<Follow> {
    return await this.prisma.follow.delete({
      where: {
        flw_id: id,
      },
    });
  }
}
