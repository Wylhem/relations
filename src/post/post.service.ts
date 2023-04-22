import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostEntity } from './entity/post.entity';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAll(): Promise<Array<PostEntity>> {
    return await this.prisma.post.findMany({
      include: {
        person: true,
      },
    });
  }
  public async getOne(id: string): Promise<PostEntity> {
    return await this.prisma.post.findFirst({
      where: {
        pst_id: id,
      },
      include: {
        person: true,
      },
    });
  }

  public async create(postDto: PostDto): Promise<PostEntity> {
    return await this.prisma.post.create({
      data: {
        pst_title: postDto.title,
        pst_text: postDto.text,
        pst_person: postDto.person.id,
      },
      include: {
        person: true,
      },
    });
  }

  public async createNewPostFromPerson(
    idPerson: string,
    postDto: PostDto,
  ): Promise<PostEntity> {
    return await this.prisma.post.create({
      data: {
        pst_title: postDto.title,
        pst_text: postDto.text,
        person: {
          connect: {
            per_id: idPerson,
          },
        },
      },
    });
  }
  public async delete(id: string): Promise<PostEntity> {
    return await this.prisma.post.delete({
      where: {
        pst_id: id,
      },
      include: {
        person: true,
      },
    });
  }
}
