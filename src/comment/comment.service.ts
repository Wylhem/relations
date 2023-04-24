import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(commentDto: CommentDto): Promise<Comment> {
    return await this.prismaService.comment.create({
      data: {
        cmt_text: commentDto.text,
        post: {
          connect: {
            pst_id: commentDto.post.id,
          },
        },
        person: {
          connect: {
            per_id: commentDto.person.id,
          },
        },
      },
      include: {
        person: true,
      },
    });
  }

  /**public async createNewCommentFromPerson(
    idPerson: string,
    commentDto: CommentDto,
  ): Promise<Comment> {
    return await this.prismaService.comment.create({
      data: {
        cmt_comment: commentDto.comment,
        cmt_text: commentDto.text,
        person: {
          connect: {
            per_id: idPerson,
          },
        },
      },
    });
  }**/

  public async getAll(): Promise<Array<Comment>> {
    return await this.prismaService.comment.findMany({
      include: {
        person: true,
      },
    });
  }

  public async getOne(id: string): Promise<Comment> {
    return await this.prismaService.comment.findFirst({
      where: {
        cmt_id: id,
      },
      include: {
        person: true,
      },
    });
  }

  public async update(id: string, commentDto: CommentDto) {
    return await this.prismaService.comment.update({
      where: {
        cmt_id: id,
      },
      data: {
        cmt_text: commentDto.text,
        post: {
          connect: {
            pst_id: commentDto.post.id,
          },
        },
      },
      include: {
        person: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.comment.delete({
      where: {
        cmt_id: id,
      },
      include: {
        person: true,
      },
    });
  }
}
