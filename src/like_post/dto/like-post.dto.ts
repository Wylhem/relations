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
   * Gets or sets person
   */
  post_l: string;

  /**
   * Gets or sets person
   */
  post?: PostDto;

  public static Load(likePost: LikePostEntity): LikePostDto {
    return {
      createdAt: undefined, updatedAt: undefined,
      id: likePost.lkp_id,
      post_l: likePost.lkp_post,
      post: likePost.post ? PostDto.Load(likePost.post) : null,
      person: likePost.person ? PersonDto.Load(likePost.person) : null
    };
  }
}
