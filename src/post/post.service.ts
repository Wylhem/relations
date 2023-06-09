import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostEntity } from './entity/post.entity';
import { PostDto } from './dto/post.dto';
import { CategoryEntity } from '../category/entities/category.entity';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAll(): Promise<Array<PostEntity>> {
    return await this.prisma.post.findMany({
      include: {
        person: true,
        comment: {
          include: {
            person: {
              include: {
                avatar: true,
              },
            },
          },
        },
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
        picture: true,
        comment: true,
        post_category: {
          include: {
            category: true,
          },
        },
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

  public async connectPicture(
    postId: string,
    pictureId: string,
  ): Promise<PostEntity> {
    return await this.prisma.post.update({
      data: {
        picture: {
          connect: {
            pct_id: pictureId,
          },
        },
      },
      where: {
        pst_id: postId,
      },
    });
  }

  public async createNewPostFromPerson(
    idPerson: string,
    postDto: PostDto,
    categories?: Array<string>,
  ): Promise<PostEntity> {
    return await this.prisma.$transaction(async (tx) => {
      const newCategories: CategoryEntity[] = new Array<CategoryEntity>();
      if (categories && categories.length > 0) {
        for (const newsCat of categories) {
          newCategories.push(
            await tx.category.upsert({
              where: {
                ctg_label: newsCat,
              },
              create: {
                ctg_label: newsCat,
              },
              update: {
                ctg_label: newsCat,
              },
            }),
          );
        }
        const post: PostEntity = await tx.post.create({
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

        for (const cat of newCategories) {
          await tx.post_category.create({
            data: {
              post: {
                connect: {
                  pst_id: post.pst_id,
                },
              },
              category: {
                connect: {
                  ctg_id: cat.ctg_id,
                },
              },
            },
          });
        }
        return post;
      } else {
        return await tx.post.create({
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
