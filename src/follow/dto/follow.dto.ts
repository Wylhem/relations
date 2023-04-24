import { BaseDto } from '../../shared/base/base.dto';
import { PersonDto } from '../../person/dto/person.dto';
import { Follow } from '../entity/follow.entity';

export class FollowDto extends BaseDto {
  /**
   * Gets or sets follower
   */
  follower?: PersonDto;

  /**
   * Gets or sets Following.
   */
  following?: PersonDto;

  public static Load(follow: Follow): FollowDto {
    return {
      id: follow.flw_id,
      follower: follow.follower ? PersonDto.Load(follow.follower) : null,
      following: follow.following ? PersonDto.Load(follow.following) : null,
      createdAt: follow.flw_createdAt,
      updatedAt: follow.flw_updatedAt,
    };
  }
}
