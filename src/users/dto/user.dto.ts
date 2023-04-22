import { BaseDto } from '../../shared/base/base.dto';
import { Users } from '../entities/user.entity';
import { IsEmail } from 'class-validator';
import { PersonDto } from '../../person/dto/person.dto';
import { person } from '@prisma/client';
export class UserDto extends BaseDto {
  /**
   * Gets or sets email.
   */
  @IsEmail()
  email: string;

  /**
   * Gets or sets password.
   */
  password?: string;

  /**
   * Gets or sets username.
   */
  username: string;

  /**
   * Gets or sets refreshToken.
   */
  refreshToken: string;

  /**
   * Gets or sets Person.
   */
  person?: PersonDto;

  public static Load(users: Users): UserDto {
    return {
      id: users.usr_id,
      username: users.usr_username,
      email: users.usr_email,
      refreshToken: users.usr_refreshToken,
      person: users.person ? PersonDto.Load(users.person) : null,
      createdAt: users.usr_createdAt,
      updatedAt: users.usr_updatedAt,
    };
  }
}
