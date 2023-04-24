import { BaseDto } from '../../shared/base/base.dto';
import { Comment } from '../entities/comment.entity';
import { PersonDto } from '../../person/dto/person.dto';
import { PostDto } from '../../post/dto/post.dto';

export class CommentDto extends BaseDto {
  /**
   * Gets or sets comment text.
   */
  text: string;

  post?: PostDto;

  /**
   * Gets or sets Person.
   */
  person?: PersonDto;

  public static Load(comment: Comment): CommentDto {
    return {
      id: comment.cmt_id,
      text: comment.cmt_text,
      createdAt: comment.cmt_createdAt,
      updatedAt: comment.cmt_updatedAt,
      post: comment.post ? PostDto.Load(comment.post) : null,
      person: comment.person ? PersonDto.Load(comment.person) : null,
    };
  }
}
