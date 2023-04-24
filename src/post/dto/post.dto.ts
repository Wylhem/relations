import { PersonDto } from '../../person/dto/person.dto';
import { PostEntity } from '../entity/post.entity';
import { BaseDto } from '../../shared/base/base.dto';
import { PictureDto } from '../../picture/dto/picture.dto';
import { PostCategoryDto } from '../../post-category/dto/post-category.dto';
import { CommentDto } from '../../comment/dto/comment.dto';

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

  /**
   * Gets or sets numbers likes
   */
  nbLikes?: number;

  /**
   * Gets or sets commentsDto
   */
  comments?: Array<CommentDto>;

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
      comments: post.comment
        ? post.comment.map((comment) => CommentDto.Load(comment))
        : null,
      updatedAt: post.pst_updatedAt,
      createdAt: post.pst_createdAt,
    };
  }
}
