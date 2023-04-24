import { BaseDto } from '../../shared/base/base.dto';
import { PersonDto } from '../../person/dto/person.dto';
import { CommentDto } from '../../comment/dto/comment.dto';
import { LikeCommentEntity } from '../entities/like-comment.entity';

export class LikeCommentDto extends BaseDto {
  /**
   * Gets or sets person
   */
  person?: PersonDto;

  /**
   * Gets or sets post
   */
  comment?: CommentDto;

  /**
   * Gets or sets nbLIkes /!\Calculated fied.
   */
  nbLikes?: number;

  public static Load(likePost: LikeCommentEntity): LikeCommentDto {
    return {
      id: likePost.lkc_id,
      createdAt: likePost.lkc_createdAt,
      updatedAt: likePost.lck_updatedAt,
      nbLikes: likePost.nbLikes,
      comment: likePost.comment ? CommentDto.Load(likePost.comment) : null,
      person: likePost.person ? PersonDto.Load(likePost.person) : null,
    };
  }
}
