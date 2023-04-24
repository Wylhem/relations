import { post } from '@prisma/client';
import { Person } from '../../person/entity/person.entitiy';
import { PictureEntity } from '../../picture/entity/picture.entity';
import { PostCategory } from '../../post-category/entity/post-category.entity';

export class PostEntity implements post {
  pst_id: string;
  pst_title: string;
  pst_text: string;
  pst_createdAt: Date;
  pst_updatedAt: Date;
  pst_person: string;
  pst_picture: string;
  pst_video: string;

  person?: Person;

  picture?: PictureEntity;

  post_category?: Array<PostCategory>;

  /**
   * /!\ Calculated Field.
   */
  nbLikes?: number;
}
