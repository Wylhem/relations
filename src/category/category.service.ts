import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { PrismaService } from "../prisma/prisma.service";
import { CategoryEntity } from "./entities/category.entity";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAll(): Promise<Array<CategoryEntity>> {
    return await this.prisma.category.findMany();
  }

  public async getOne(id: string): Promise<CategoryEntity> {
    return await this.prisma.category.findFirst({
      where: {
        ctg_id: id,
      },
    });
  }

  public async create(categoryDto: CategoryDto): Promise<CategoryEntity> {
    return await this.prisma.category.create({
      data: {
        ctg_label: categoryDto.label,
      },
    });
  }

  public async delete(id: string): Promise<CategoryEntity> {
    return await this.prisma.category.delete({
      where: {
        ctg_id: id,
      },
    });
  }
}
