import { BaseDto } from '../../shared/base/base.dto';
import { civility} from '@prisma/client';
import { Person } from '../entity/person.entitiy';
import { UserDto } from '../../users/dto/user.dto';
import { PostDto } from '../../post/dto/post.dto';
import { FollowDto } from '../../follow/dto/follow.dto';
import { PictureDto } from '../../picture/dto/picture.dto';
import { LikePostDto } from "../../like_post/dto/like-post.dto";
import { LikeCommentDto } from "../../like-comment/dto/like-comment.dto";
export class PersonDto extends BaseDto {
  /**
   * Gets or sets firstname.
   */
  firstname: string;

  /**
   * Gets or sets lastname.
   */
  lastname: string;

  /**
   * Gets or sets civiity
   * @example 'M', 'F'
   */
  civility: civility;

  /**
   * Gets or sets Users
   */
  users?: UserDto;

  /**
   *  Gets or sets picture
   */
  picture?: PictureDto;
  /**
   * Gets or sets Posts
   */
  posts?: Array<PostDto>;
  /**
   * Gets or sets Followers
   */
  followers?: Array<FollowDto>;

  /**
   * Gets or sets Followings
   */
  following?: Array<FollowDto>;

  /**
   * Gets or sets LikePosts
   */
  likePosts?: Array<LikePostDto>;

  /**
   * Gets or sets LikeComments
   */
  likeComments?: Array<LikeCommentDto>;

  public static Load(person: Person): PersonDto {
    return {
      id: person.per_id,
      firstname: person.per_firstname,
      lastname: person.per_lastname,
      civility: person.per_civility,
      users: person.users ? UserDto.Load(person.users) : null,
      posts: person.posts
        ? person.posts.map((post) => PostDto.Load(post))
        : null,
      likePosts: person.likePosts
        ? person.likePosts.map((likePost) => LikePostDto.Load(likePost))
        : null,
      likeComments: person.likeComments
        ? person.likeComments.map((likeComment) => LikeCommentDto.Load(likeComment))
        : null,
      followers: person.follower
        ? person.follower.map((follower) => FollowDto.Load(follower))
        : null,
      following: person.following
        ? person.following.map((following) => FollowDto.Load(following))
        : null,
      picture: person.picture ? PictureDto.Load(person.picture) : null,
      createdAt: person.per_createdAt,
      updatedAt: person.per_updatedAt,
    };
  }
}
