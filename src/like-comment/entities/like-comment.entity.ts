import { like_comment } from '@prisma/client';
import { Comment } from '../../comment/entities/comment.entity';
import { Person } from '../../person/entity/person.entitiy';

export class LikeCommentEntity implements like_comment {
  lkc_id: string;
  lke_comment: string;
  lkc_person: string;
  lck_updatedAt: Date;
  lkc_createdAt: Date;

  person?: Person;
  comment?: Comment;

  nbLikes?: number;
}
