import { PersonDto } from '../../person/dto/person.dto';
import { PostEntity } from '../entity/post.entity';
import { BaseDto } from '../../shared/base/base.dto';
import { IsDefined } from 'class-validator';

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

  public static Load(post: PostEntity): PostDto {
    return {
      id: post.pst_id,
      title: post.pst_title,
      text: post.pst_text,
      person: post.person ? PersonDto.Load(post.person) : null,
      updatedAt: post.pst_updatedAt,
      createdAt: post.pst_createdAt,
    };
  }
}
