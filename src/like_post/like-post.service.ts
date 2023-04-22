import { Injectable } from '@nestjs/common';
import { LikePostDto } from './dto/like-post.dto';
import { PrismaService } from "../prisma/prisma.service";
import { LikePostEntity } from "./entities/like-post.entity";

@Injectable()
export class LikePostService {
  constructor(private readonly prisma: PrismaService) {}



  public async create(likePostDto: LikePostDto): Promise<LikePostEntity> {
    return await this.prisma.like_post.create({
      data: {
        lkp_post: likePostDto.post_l,
        lkp_person: likePostDto.person.id,
      },
      include: {
        person: true,
        post: true
      },
    });
  }

  public async getAll(): Promise<Array<LikePostEntity>> {
    return await this.prisma.like_post.findMany({
      include: {
        person: true,
        post: true,
      },
    });
  }

  public async getOne(id: string): Promise<LikePostEntity> {
    return await this.prisma.like_post.findFirst({
      where: {
        lkp_id: id,
      },
      include: {
        person: true,
        post: true
      },
    });
  }

  public async delete(id: string): Promise<LikePostEntity> {
    return await this.prisma.like_post.delete({
      where: {
        lkp_id: id,
      },
      include: {
        person: true,
        post: true
      },
    });
  }
}
