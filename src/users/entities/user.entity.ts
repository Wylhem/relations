import { users } from '@prisma/client';

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
}
