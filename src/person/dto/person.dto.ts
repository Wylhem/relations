import { BaseDto } from '../../shared/base/base.dto';
import { civility, users } from '@prisma/client';
import { Person } from '../entity/person.entitiy';
import { UserDto } from '../../users/dto/user.dto';
import { Users } from '../../users/entities/user.entity';

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

  public static Load(person: Person): PersonDto {
    return {
      id: person.per_id,
      firstname: person.per_firstname,
      lastname: person.per_lastname,
      civility: person.per_civility,
      users: person.users ? UserDto.Load(person.users) : null,
      createdAt: person.per_createdAt,
      updatedAt: person.per_updatedAt,
    };
  }
}
