import { BaseDto } from "../../shared/base/base.dto";
import { PersonDto } from "../../person/dto/person.dto";
import { FollowEntity } from "../entities/follow.entity";
import { Person } from "../../person/entity/person.entitiy";

export class FollowDto extends BaseDto{

  /**
   * Gets or sts followers id
   */
  followers_id: string;

  /**
   * Gets or sets following id
   */
  following_id: string;

  /**
   * Gets or sets following
   */
  following?: PersonDto;

  /**
   * Gets or sets followers
   */
  followers?: PersonDto;

  public static Load(follow: FollowEntity): FollowDto {
    return {
      id: follow.flw_id,
      followers_id: follow.flw_followers,
      following_id: follow.flw_following,
      following: follow.following ? PersonDto.Load(follow.following) : null,
      followers: follow.followers ? PersonDto.Load(follow.followers) : null,
      createdAt: follow.flw_createdAt,
      updatedAt: follow.flw_updatedAt,
    };
  }
}
