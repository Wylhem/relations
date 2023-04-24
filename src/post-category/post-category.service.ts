import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostCategory } from './entity/post-category.entity';
import { PostCategoryDto } from './dto/post-category.dto';

@Injectable()
export class PostCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAll(): Promise<Array<PostCategory>> {
    return await this.prisma.post_category.findMany({
      include: {
        post: true,
        category: true,
      },
    });
  }

  public async getOne(id: string): Promise<PostCategory> {
    return await this.prisma.post_category.findFirst({
      where: {
        pcg_id: id,
      },
      include: {
        post: true,
        category: true,
      },
    });
  }

  public async create(postCategory: PostCategoryDto): Promise<PostCategory> {
    return await this.prisma.post_category.create({
      data: {
        post: {
          connect: {
            pst_id: postCategory.post.id,
          },
        },
        category: {
          connect: {
            ctg_id: postCategory.category.id,
          },
        },
      },
      include: {
        post: true,
        category: true,
      },
    });
  }

  public async delete(id: string): Promise<PostCategory> {
    return await this.prisma.post_category.delete({
      where: {
        pcg_id: id,
      },
    });
  }
}
