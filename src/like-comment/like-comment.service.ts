import { Injectable } from '@nestjs/common';
import { LikeCommentDto } from './dto/like-comment.dto';
import { PrismaService } from "../prisma/prisma.service";
import { LikeCommentEntity } from "./entities/like-comment.entity";

@Injectable()
export class LikeCommentService {
  constructor(private readonly prisma: PrismaService) {}



  public async create(likeCommentDto: LikeCommentDto): Promise<LikeCommentEntity> {
    return await this.prisma.like_comment.create({
      data: {
        lke_comment: likeCommentDto.comment.id,
        lkc_person: likeCommentDto.person.id,
      },
      include: {
        person: true,
        comment: true,
      },
    });
  }

  public async createNewLikeCommentFromPerson(
    idComment: string,
    idPerson: string,
  ): Promise<LikeCommentEntity> {
    return await this.prisma.like_comment.create({
      data: {
        comment:{
          connect: {
            cmt_id: idComment
          }
        },
        person: {
          connect: {
            per_id: idPerson,
          },
        },
      },
    });
  }

  public async getAll(): Promise<Array<LikeCommentEntity>> {
    return await this.prisma.like_comment.findMany({
      include: {
        person: true,
        comment: true,
      },
    });
  }

  public async getOne(id: string): Promise<LikeCommentEntity> {
    return await this.prisma.like_comment.findFirst({
      where: {
        lkc_id: id,
      },
      include: {
        person: true,
        comment: true
      },
    });
  }

  public async delete(id: string): Promise<LikeCommentEntity> {
    return await this.prisma.like_comment.delete({
      where: {
        lkc_id: id,
      },
    });
  }
}