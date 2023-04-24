import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { LikeCommentService } from '../like-comment/like-comment.service';
import { LikePostService } from '../like_post/like-post.service';

@Module({
  controllers: [PersonController],
  providers: [PersonService, LikeCommentService, LikePostService],
})
export class PersonModule {}
