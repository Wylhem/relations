import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostCategoryService } from './post-category.service';
import { PostCategoryDto } from './dto/post-category.dto';
import { PostCategory } from './entity/post-category.entity';

@Controller('post-category')
export class PostCategoryController {
  constructor(private readonly postCategoriesService: PostCategoryService) {}

  /**
   * Get all post-category
   */
  @Get()
  public async getAll(): Promise<Array<PostCategoryDto>> {
    const postCategories: Array<PostCategory> =
      await this.postCategoriesService.getAll();
    return postCategories.map((postCategory) =>
      PostCategoryDto.Load(postCategory),
    );
  }

  /**
   * Get all post category by id
   */
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<PostCategoryDto> {
    const postCategory: PostCategory = await this.postCategoriesService.getOne(
      id,
    );
    if (!postCategory) {
      throw new NotFoundException();
    }
    return PostCategoryDto.Load(postCategory);
  }

  /**
   * Create new post category
   */
  @Post()
  public async create(
    @Body() postCategoryDto: PostCategoryDto,
  ): Promise<PostCategoryDto> {
    const postCategory: PostCategory = await this.postCategoriesService.create(
      postCategoryDto,
    );
    if (!postCategory) {
      throw new BadGatewayException();
    }
    return PostCategoryDto.Load(postCategory);
  }

  /**
   * Delete post category
   * @param id
   */
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<string> {
    const postCategory: PostCategory = await this.postCategoriesService.delete(
      id,
    );
    return postCategory.pcg_id;
  }
}
