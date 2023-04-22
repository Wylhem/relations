import { like_post } from "@prisma/client";
import { PostEntity } from '../../post/entity/post.entity';
import { Person } from '../../person/entity/person.entitiy';


export class LikePostEntity implements like_post{
  lkp_post: string;
  lkp_person: string;
  lkp_id: string;

  post?: PostEntity;
  person?: Person;
}
