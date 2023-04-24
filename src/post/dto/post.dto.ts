import { PersonDto } from '../../person/dto/person.dto';
import { PostEntity } from '../entity/post.entity';
import { BaseDto } from '../../shared/base/base.dto';
import { IsDefined } from 'class-validator';
import { PictureDto } from '../../picture/dto/picture.dto';
import { PostCategory } from '../../post-category/entity/post-category.entity';
import { PostCategoryDto } from '../../post-category/dto/post-category.dto';
import { category } from '@prisma/client';

export class PostDto extends BaseDto {
  /**
   * Gets or sets Title
   */
  title: string;
  /**
   * Gets or sts text
   */
  text: string;

  /**
   * Gets or sets person
   */
  person?: PersonDto;

  /**
   * Gets or sets Pictire
   */
  picture?: PictureDto;

  /**
   * Gets or sets postCategories
   */
  categories?: Array<PostCategoryDto>;

  nbLikes?: number;

  public static Load(post: PostEntity): PostDto {
    return {
      id: post.pst_id,
      title: post.pst_title,
      text: post.pst_text,
      nbLikes: post.nbLikes,
      person: post.person ? PersonDto.Load(post.person) : null,
      picture: post.picture ? PictureDto.Load(post.picture) : null,
      categories: post.post_category
        ? post.post_category.map((category) => PostCategoryDto.Load(category))
        : null,
      updatedAt: post.pst_updatedAt,
      createdAt: post.pst_createdAt,
    };
  }
}
