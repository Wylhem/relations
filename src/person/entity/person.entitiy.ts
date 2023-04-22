import { civility, person } from '@prisma/client';
import { Users } from '../../users/entities/user.entity';

export class Person implements person {
  per_id: string;
  per_firstname: string;
  per_lastname: string;
  per_civility: civility;
  per_createdAt: Date;
  per_updatedAt: Date;

  users?: Users;
}
