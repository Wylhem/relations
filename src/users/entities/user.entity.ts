import { users } from '@prisma/client';
import { Person } from '../../person/entity/person.entitiy';

export class Users implements users {
  usr_id: string;
  usr_username: string;
  usr_email: string;
  usr_password: string;
  usr_refreshToken: string;
  usr_createdAt: Date;
  usr_updatedAt: Date;
  usr_person: string;
  usr_profile: string;

  person?: Person;
}
