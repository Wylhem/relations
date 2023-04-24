import { follow } from '@prisma/client';
import { Person } from '../../person/entity/person.entitiy';

export class Follow implements follow {
  flw_id: string;
  flw_follower: string;
  flw_following: string;
  flw_createdAt: Date;
  flw_updatedAt: Date;

  follower?: Person;

  following?: Person;
}
