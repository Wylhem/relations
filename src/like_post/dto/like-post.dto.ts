import { PersonDto } from '../../person/dto/person.dto';
import { LikePostEntity } from '../entities/like-post.entity';
import { BaseDto } from '../../shared/base/base.dto';
import { PostDto } from "../../post/dto/post.dto";


export class LikePostDto extends BaseDto{
  /**
   * Gets or sets person
   */
  person?: PersonDto;

  /**
   * Gets or sets post
   */
  post?: PostDto;

  public static Load(likePost: LikePostEntity): LikePostDto {
    return {
      id: likePost.lkp_id,
      createdAt: likePost.lkp_createdAt,
      updatedAt: likePost.lkp_updatedAt,
      post: likePost.post ? PostDto.Load(likePost.post) : null,
      person: likePost.person ? PersonDto.Load(likePost.person) : null
    };
  }
}
