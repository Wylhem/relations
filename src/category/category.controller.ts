import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CategoryEntity } from "./entities/category.entity";

@ApiBearerAuth()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Get all categories
   */
  @Get()
  public async getAll(): Promise<Array<CategoryDto>> {
    const categories: Array<CategoryEntity> = await this.categoryService.getAll();
    return categories.map((categories) => CategoryDto.Load(categories));
  }

  /**
   * Gets a specific category
   * @param id
   */
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<CategoryDto> {
    const category: CategoryEntity = await this.categoryService.getOne(id);
    return CategoryDto.Load(category);
  }

  /**
   * Create new post
   * @param categoryDto PostDto
   */
  @Post()
  public async create(@Body() categoryDto: CategoryDto): Promise<CategoryDto> {
    const category: CategoryEntity = await this.categoryService.create(categoryDto);
    return CategoryDto.Load(category);
  }

  /**
   * Delete a post
   * @param id
   */
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<string> {
    const category: CategoryEntity = await this.categoryService.delete(id);
    return category.ctg_id;
  }
}
