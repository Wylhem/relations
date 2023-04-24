import { BaseDto } from '../../shared/base/base.dto';
import { PersonDto } from '../../person/dto/person.dto';
import { CategoryDto } from '../../category/dto/category.dto';
import { PostCategory } from '../entity/post-category.entity';
import { PostDto } from '../../post/dto/post.dto';

export class PostCategoryDto extends BaseDto {
  /**
   * Gets or sets Person
   */
  post?: PostDto;

  /**
   * Gets or sets category
   */
  category?: CategoryDto;

  public static Load(postCategory: PostCategory): PostCategoryDto {
    return {
      id: postCategory.pcg_id,
      post: postCategory.post ? PostDto.Load(postCategory.post) : null,
      category: postCategory.category
        ? CategoryDto.Load(postCategory.category)
        : null,
      createdAt: postCategory.pcg_createdAt,
      updatedAt: postCategory.pcg_updatedAt,
    };
  }
}
