import { civility, person } from '@prisma/client';
import { Users } from '../../users/entities/user.entity';
import { PostEntity } from '../../post/entity/post.entity';
import { LikePostEntity } from '../../like_post/entities/like-post.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Follow } from '../../follow/entity/follow.entity';
import { PictureEntity } from '../../picture/entity/picture.entity';
import { LikeCommentEntity } from '../../like-comment/entities/like-comment.entity';

export class Person implements person {
  per_picture: string;
  per_id: string;
  per_firstname: string;
  per_lastname: string;
  per_civility: civility;
  per_createdAt: Date;
  per_updatedAt: Date;

  users?: Users;

  posts?: Array<PostEntity>;

  likePosts?: Array<LikePostEntity>;

  likeComments?: Array<LikeCommentEntity>;

  comments?: Array<Comment>;

  follower?: Array<Follow>;

  following?: Array<Follow>;

  avatar?: PictureEntity;
}
