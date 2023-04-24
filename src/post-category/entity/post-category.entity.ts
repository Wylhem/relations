import { post_category } from '@prisma/client';
import { CategoryEntity } from '../../category/entities/category.entity';
import { PostEntity } from '../../post/entity/post.entity';

export class PostCategory implements post_category {
  pgc_post: string;
  pcg_id: string;
  pcg_category: string;
  pcg_createdAt: Date;
  pcg_updatedAt: Date;

  post?: PostEntity;

  category?: CategoryEntity;
}
