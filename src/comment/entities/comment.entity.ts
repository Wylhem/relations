import { comment } from '@prisma/client';
import { Person } from '../../person/entity/person.entitiy';
import { PostEntity } from '../../post/entity/post.entity';

export class Comment implements comment {
  cmt_post: string;
  cmt_id: string;
  cmt_text: string;
  cmt_createdAt: Date;
  cmt_updatedAt: Date;
  cmt_person: string;

  person?: Person;

  post?: PostEntity;
}
