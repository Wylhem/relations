import { BaseDto } from '../../shared/base/base.dto';
import { civility, post, users } from '@prisma/client';
import { Person } from '../entity/person.entitiy';
import { UserDto } from '../../users/dto/user.dto';
import { Users } from '../../users/entities/user.entity';
import { PostEntity } from '../../post/entity/post.entity';
import { PostDto } from '../../post/dto/post.dto';
import { FollowDto } from "../../follow/dto/follow.dto";

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
   * @example ['M', 'F']
   */
  civility: civility;

  /**
   * Gets or sets Users
   */
  users?: UserDto;

  /**
   * Gets or sets Posts
   */
  posts?: Array<PostDto>;

  /**
   * Gets or sets Follows
   */
  follows?: Array<FollowDto>;

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
      follows: person.posts
        ? person.follows.map((follow) => FollowDto.Load(follow))
        : null,
      createdAt: person.per_createdAt,
      updatedAt: person.per_updatedAt,
    };
  }
}
